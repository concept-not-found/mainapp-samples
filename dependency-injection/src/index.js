import {h, App} from 'mainapp'

import RemoteCounter from './RemoteCounter'
import TotallyRealApiService from './TotallyRealApiService'

const totallyRealApiService = TotallyRealApiService()

const main = App({
  remoteCounter: RemoteCounter(totallyRealApiService),
  view ({remoteCounter}) {
    return <remoteCounter.view />
  }
}, document.getElementById('mainapp-entry'))

main.remoteCounter.loadCount()
