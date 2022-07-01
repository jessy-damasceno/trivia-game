import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import interrogation from '../assets/interrogation.png';
import check from '../assets/check.png';
import wrong from '../assets/wrong.png';
import ampulheta from '../assets/ampulheta.png';
import '../styles/TriviaQuestion.css';
import { setScore } from '../redux/actions';

function decodeEntity(inputStr) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const multiplier = {
  hard: 3,
  medium: 2,
  easy: 1,
};

const INITIAL_STATE = {
  isClicked: false,
  isCorrectAnswer: false,
  counter: 30,
  intervalId: 0,
  isCounting: true,
};

class TriviaQuestion extends React.Component {
  state = {
    ...INITIAL_STATE,
    shuffledQuestions: [],
  }

  componentDidMount() {
    this.setShuffledQuestion();
    const intervalId = setInterval(this.timer, +'1000');
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    // use intervalId from the state to clear the interval
    clearInterval(intervalId);
  }

  setShuffledQuestion = () => {
    const { quest: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;

    const allAnswers = [...incorrectAnswers, correctAnswer].map((answer, index) => ({
      answer,
      datatestid: answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`,
      isCorrect: answer === correctAnswer,
    }));
    shuffleArray(allAnswers);

    this.setState({ shuffledQuestions: allAnswers });
  }

  handleClick = (isCorrect) => {
    const { setScoreAction, nextQuestion } = this.props;

    this.stopCounting();
    this.setState({ isClicked: true });
    if (isCorrect) {
      this.setState({ isCorrectAnswer: true });
      setScoreAction(this.score());
    } else {
      this.setState({ isCorrectAnswer: false });
    }
    nextQuestion();
  }

  score = () => {
    const { quest: { difficulty } } = this.props;
    const { counter } = this.state;

    return +'10' + (counter * multiplier[difficulty]);
  }

  timer = () => {
    const { counter, intervalId } = this.state;
    // setState method is used to update the state
    const newCount = counter - 1;
    if (newCount > +'0') {
      this.setState({ counter: newCount });
    } else {
      clearInterval(intervalId);
      this.setState({ isCounting: false, isClicked: true });
    }
  }

  next = () => {
    const { last, history } = this.props;

    if (last) {
      history.push('/feedback');
    } else {
      const intervalId = setInterval(this.timer, +'1000');
      this.setState({ ...INITIAL_STATE, intervalId });
      this.setShuffledQuestion();
    }
  }

  stopCounting = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ isCounting: false });
  }

  checkAnswers = (isCorrect) => (isCorrect
    ? 'm5 btn green disabled' : 'm5 btn red disabled');

  render() {
    const { isClicked, isCorrectAnswer,
      shuffledQuestions, counter, isCounting } = this.state;
    const { quest: {
      category,
      question,
    } } = this.props;

    return (
      <section className="question-container">
        <h4 data-testid="question-category">{category}</h4>
        { !isClicked ? (
          <img src={ interrogation } alt="responda" className="img" />
        ) : (
          <img
            src={ isCorrectAnswer ? check : wrong }
            alt={ isCorrectAnswer ? 'check' : 'wrong' }
            className="img"
          />)}
        <div className="counter-container">
          {isCounting ? (
            <>
              <img
                src={ ampulheta }
                alt="ampulheta"
                className="img rotate-center"
              />
              <span>{counter}</span>
            </>
          ) : (
            <button
              type="button"
              data-testid="btn-next"
              className="btn"
              onClick={ this.next }
            >
              NEXT
            </button>
          )}
        </div>
        <p data-testid="question-text">
          {decodeEntity(question)}
        </p>
        <div data-testid="answer-options">
          {shuffledQuestions.map(({ answer, datatestid, isCorrect }) => (
            <button
              key={ datatestid }
              data-testid={ datatestid }
              type="button"
              onClick={ () => this.handleClick(isCorrect) }
              disabled={ isClicked }
              className={ isClicked ? this.checkAnswers(isCorrect) : 'm5 btn' }
            >
              {decodeEntity(answer)}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setScoreAction: (score) => dispatch(setScore(score)),
});

export default withRouter(connect(null, mapDispatchToProps)(TriviaQuestion));

TriviaQuestion.propTypes = {
  quest: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setScoreAction: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  last: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
