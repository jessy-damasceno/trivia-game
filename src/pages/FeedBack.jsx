import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Header.css';

class FeedbackMessage extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const rightAnwsers = 3;
    const feedbackFunction = () => {
      if (assertions < rightAnwsers) {
        return <h1>Could be better...</h1>;
      } if (assertions >= rightAnwsers) {
        return <h1>Well Done!</h1>;
      }
    };

    const onClickPlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    };

    const onClickRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    };

    return (
      <>
        <Header />
        {feedbackFunction()}
        <h2>Total de pontos:</h2>
        <p data-testid="feedback-total-score">{score}</p>
        <h2>Total de acertos:</h2>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          onClick={ onClickPlayAgain }
          data-testid="btn-play-again"
        >
          Play Again

        </button>
        <button
          type="button"
          onClick={ onClickRanking }
          data-testid="btn-play-again"
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps, null)(FeedbackMessage);

FeedbackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
