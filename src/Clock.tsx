import { h, render, Component } from 'preact'
import { css } from 'emotion'

const clockStyle = css`
  color: red;
  background: linear-gradient(red, yellow);
`

export default class Clock extends Component {
  render() {
    console.log('render called')
    let time = new Date().toLocaleTimeString()
    return <span className={clockStyle}>{time}</span>
  }
}
