import { h, render, Component } from 'preact'
import Clock from './Clock'

fetch('https://api.quizlet.com/2.0/sets/415?client_id=SVRTeppr9y', {
  method: 'get',
  mode: 'cors'
}).then(response => {
  console.log('response', response)
})

document.body.innerHTML = ''
render(<Clock />, document.body)
