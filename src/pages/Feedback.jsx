import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class FeedbackMessage extends React.Component {
  onClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  onClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <div className="feedback-container">
          <h1 data-testid="feedback-text">

            {assertions >= +'3' ? 'Well Done!' : 'Could be better...'}
          </h1>
          <h2>Total de pontos:</h2>
          <p data-testid="feedback-total-score">{score}</p>
          <h2>Total de acertos:</h2>
          <p data-testid="feedback-total-question">{assertions}</p>
          <button
            className="btn"
            type="button"
            onClick={ this.onClickPlayAgain }
            data-testid="btn-play-again"
          >
            Play Again

          </button>
          <button
            className="btn"
            type="button"
            onClick={ this.onClickRanking }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </div>
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
