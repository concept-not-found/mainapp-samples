import {h} from 'mainapp'

export default (apiService) => {
  return {
    loading: true,
    count: NaN,
    async loadCount () {
      const remoteCount = await apiService.loadCount()
      return {
        loading: false,
        count: remoteCount
      }
    },
    down ({count}, value) {
      return {
        count: count - value
      }
    },
    up ({count}, value) {
      return {
        count: count + value
      }
    },
    view ({loading, count, down, up}) {
      if (loading) {
        return <p>Loading...</p>
      }
      return <div>
        <h1>{count}</h1>
        <button onclick={() => down(1)}>-</button>
        <button onclick={() => up(1)}>+</button>
      </div>
    }
  }
}
