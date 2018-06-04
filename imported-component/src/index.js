import {h, App} from 'mainapp'

import Counter from './Counter'

App({
  Counter,
  view ({Counter}) {
    return <Counter />
  }
}, document.getElementById('mainapp-entry'))
