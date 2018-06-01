import {h, App} from 'mainapp'

App({
  async loadCounter () {
    const {default: Counter} = await import('./Counter')
    return {
      counter: Counter
    }
  },
  view ({loadCounter, counter}) {
    return <div>
      <button onclick={loadCounter} disabled={counter}>Load counter</button>
      {counter && <counter.view />}
    </div>
  }
}, document.getElementById('mainapp-entry'))
