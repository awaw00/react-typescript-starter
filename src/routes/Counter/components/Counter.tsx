import * as React from 'react';
import { observer } from 'mobx-react';
import counterStore from 'stores/counter';

@observer
class Counter extends React.Component<any, any> {
  componentWillMount () {
    counterStore.reset();
  }
  render () {
    return (
      <div>
        <p>Counter: {counterStore.counter}</p>
        <p>
          <button onClick={counterStore.increase}>sync increase</button>
          {'  '}
          <button onClick={counterStore.doubleIncrease}>async double</button>
        </p>
      </div>
    );
  }
}

export default Counter;
