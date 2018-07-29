import { h, Component } from 'preact'

interface ClockState {
  time: number
}

interface ClockProps {}

export default class Clock extends Component<ClockProps, ClockState> {
  interval?: number

  // constructor(props: ClockProps) {
  //   super(props)

  //   chrome.storage.local.get('time', ({ time }: { time: number }) => {
  //     console.log('get time', time)
  //     this.setState({ time: time || 0 })
  //   })
  // }

  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     this.setState(
  //       ({ time }: ClockState) => ({
  //         time: time + 1
  //       }),
  //       () => {
  //         console.log('set time', this.state.time)
  //         chrome.storage.local.set({ time: this.state.time })
  //       }
  //     )
  //   }, 1000)
  // }

  // componentWillUnmount() {
  //   if (this.interval) clearInterval(this.interval)
  // }

  render(_props: never, { time }: ClockState) {
    return <div>Time: {time}</div>
  }
}
