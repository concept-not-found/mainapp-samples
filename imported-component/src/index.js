import {h, App} from 'mainapp'

import Counter from './Counter'

App({
  counter: Counter,
  view ({counter}) {
    return <counter.view />
  }
}, document.getElementById('mainapp-entry'))
