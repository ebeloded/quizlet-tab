import * as functions from 'firebase-functions'
import axios from 'axios'
import proxyDataToExtension from './proxyDataToExtension'
import config from './config.json'
const { secret, client_id } = functions.config().quizlet
const { redirect_uri, extension_id } = config

const executeScriptOnClient = script => (...args) => `
  <script>
    (${script}).apply(null,[${args.map(v => JSON.stringify(v))}])
  </script>
`

function getToken(code) {
  return axios
    .post(
      'https://api.quizlet.com/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      },
      {
        auth: {
          username: client_id,
          password: secret,
        },
      }
    )
    .then(response => response.data, error => error.response.data)
}

const sendScript = response => data =>
  response
    .type('html')
    .send(
      executeScriptOnClient(proxyDataToExtension.toString())(extension_id, data)
    )

export const auth = functions.https.onRequest((request, response) => {
  const sendScriptResponse = sendScript(response)

  if (request.query.error) {
    sendScriptResponse(request.query)
  } else {
    const { code, state } = request.query
    getToken(code).then(authResponse => sendScriptResponse(authResponse))
  }
})
