import React from 'react';
import ampulheta from '../assets/ampulheta.png';
import '../styles/Counter.css';

export default class Counter extends React.Component {
  render() {
    return (
      <>
        <img src={ ampulheta } alt="ampulheta" className="counter_img rotate-center" />
        <span>30</span>
      </>
    );
  }
}
