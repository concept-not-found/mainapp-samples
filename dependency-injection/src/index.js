import {h, App} from 'mainapp'

import RemoteCounter from './RemoteCounter'
import TotallyRealApiService from './TotallyRealApiService'

const totallyRealApiService = TotallyRealApiService()

const main = App({
  RemoteCounter: RemoteCounter(totallyRealApiService),
  view ({RemoteCounter}) {
    return <RemoteCounter />
  }
}, document.getElementById('mainapp-entry'))

main.RemoteCounter.loadCount()
