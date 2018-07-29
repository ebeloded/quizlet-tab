import { h, render, Component } from 'preact'
import config from './config.json'
const { client_id, redirect_uri } = config
const root = document.getElementById('root')

const jsonToQueryString = json =>
  '?' +
  Object.keys(json)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&')

class AuthPopup extends Component<any, any> {
  messageListener = (data: any, _sender, callback: () => void) => {
    console.log('messageListener', data)
    if (data.error) {
      console.log('onrejected', data)
      this.props.onRejected(data)
    } else {
      console.log('on authencicated', data)
      this.props.onAuthenticated(data)
    }
    callback()
  }

  componentDidMount() {
    chrome.runtime.onMessageExternal.addListener(this.messageListener)
  }

  componentWillUnmount() {
    chrome.runtime.onMessageExternal.removeListener(this.messageListener)
  }

  openAuthWindow() {
    const query = {
      response_type: 'code',
      client_id,
      scope: 'read',
      redirect_uri: redirect_uri,
      state: Date.now(),
    }

    const authUrl = 'https://quizlet.com/authorize' + jsonToQueryString(query)

    return window.open(authUrl, 'quizlet-auth')
  }

  render() {
    console.log('Render Auth Popup')
    const authWindow = this.openAuthWindow()

    return (
      <div
        onClick={() =>
          authWindow.closed ? this.props.onRejected() : authWindow.focus()
        }
      >
        Authenticating
      </div>
    )
  }
}

class SignIn extends Component<any, any> {
  render() {
    console.log('render signin')
    const authenticate = () => {
      this.setState({
        authenticating: true,
      })
    }
    return (
      <div>
        {this.state.authenticating ? (
          <AuthPopup
            onAuthenticated={v => this.props.onComplete(v)}
            onRejected={v =>
              this.setState({ authenticating: false }, () => {
                this.props.onComplete(v)
              })
            }
          />
        ) : (
          <a onClick={authenticate}>Sign in</a>
        )}
      </div>
    )
  }
}

class App extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('render app', this.state)
    return (
      <div>
        {this.state.access_token ? (
          <div>{this.state.access_token}</div>
        ) : (
          <SignIn onComplete={response => this.setState(response)} />
        )}
      </div>
    )
  }
}

render(
  <div id="root">
    <App />
  </div>,
  document.body,
  root!
)
