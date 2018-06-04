import {h, App} from 'mainapp'

const Counter = {
  count: 0,
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
  view ({count, down, up}, {name}) {
    return <div>
      <h1>{name}: {count}</h1>
      <button onclick={() => down(1)}>-</button>
      <button onclick={() => up(1)}>+</button>
    </div>
  }
}

App({
  First: Counter,
  Second: Counter,
  view ({First, Second}) {
    return <div>
      <First name="first" />
      <Second name="second" />
      <p>Sum: {First.count + Second.count}</p>
    </div>
  }
}, document.getElementById('mainapp-entry'))
