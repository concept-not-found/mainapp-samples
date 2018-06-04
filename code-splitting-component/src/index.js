import {h, App} from 'mainapp'

App({
  async loadCounter () {
    const {default: Counter} = await import('./Counter')
    return {
      Counter
    }
  },
  view ({loadCounter, Counter}) {
    return <div>
      <button onclick={loadCounter} disabled={Counter}>Load counter</button>
      {Counter && <Counter />}
    </div>
  }
}, document.getElementById('mainapp-entry'))
