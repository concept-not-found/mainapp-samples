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

const Main = {
  nextCounterId: 0,
  counters: {},
  addCounter ({nextCounterId, counters}) {
    const id = nextCounterId
    return {
      nextCounterId: id + 1,
      counters: {
        [id]: Counter
      }
    }
  },
  removeCounter ({counters}, id) {
    return {
      counters: {
        [id]: undefined
      }
    }
  },
  view ({addCounter, removeCounter, counters}) {
    return <div>
      <button onclick={addCounter}>Add counter</button>
      <div>
        {Object.keys(counters).map((id) => {
          const Counter = counters[id]
          return <div>
            <Counter key={id} name={`counter #${id}`} />
            <button style="margin-bottom: 20px;" onclick={() => removeCounter(id)}>Remove counter #{id}</button>
          </div>
        })}
      </div>
      <p>Sum: {Object.keys(counters).reduce((sum, id) => sum + counters[id].count, 0)}</p>
    </div>
  }
}

App(Main, document.getElementById('mainapp-entry'))
