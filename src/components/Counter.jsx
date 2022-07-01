import React from 'react';
import ampulheta from '../assets/ampulheta.png';
import '../styles/Counter.css';

export default class Counter extends React.Component {
  state = {
    counter: 30,
    intervalId: 0,
    isCounting: true,
  };

  componentDidMount() {
    const intervalId = setInterval(this.timer, +'1000');
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    // use intervalId from the state to clear the interval
    clearInterval(intervalId);
  }

  timer = () => {
    const { counter, intervalId } = this.state;
    // setState method is used to update the state
    const newCount = counter - 1;
    if (newCount > +'0') {
      this.setState({ counter: newCount });
    } else {
      clearInterval(intervalId);
      this.setState({ isCounting: false });
    }
  }

  stopCounting = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ isCounting: false });
  }

  render() {
    const { counter, isCounting } = this.state;
    return (
      <div className="counter-container">
        {isCounting ? (
          <>
            <img src={ ampulheta } alt="ampulheta" className="counterimg rotate-center" />
            <span>{counter}</span>
          </>
        ) : (
          <button type="button" className="btn">NEXT</button>
        )}
      </div>
    );
  }
}
