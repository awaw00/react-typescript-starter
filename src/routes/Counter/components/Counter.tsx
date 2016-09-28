import * as React from 'react';
import { increase, double } from 'stores/actions/counter';
import { connect } from 'react-redux';

interface ICounterProps {
  counter: number;
  increase: () => {};
  double: () => {};
}
class Counter extends React.Component<ICounterProps, any> {
  componentWillMount () {
  }
  render () {
    const { counter, increase, double } = this.props;
    return (
      <div>
        <p>Counter: {counter}</p>
        <p>
          <button onClick={increase}>sync increase</button>
          {'  '}
          <button onClick={double}>async double</button>
        </p>
      </div>
    );
  }
}

export default connect(
  (state) => ({counter: state.counter}),
  {
    increase,
    double
  }
)(Counter);
