import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TriviaQuestion.css';
import ampulheta from '../assets/ampulheta.png';
import check from '../assets/check.png';
import wrong from '../assets/wrong.png';

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

export default class TriviaQuestion extends React.Component {
  state = {
    isClicked: false,
    isCorrectAnswer: false,
    shuffledQuestions: [],
  }

  componentDidMount() {
    this.setShuffledQuestion();
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
    this.setState({ isClicked: true });
    if (isCorrect) {
      this.setState({ isCorrectAnswer: true });
    } else {
      this.setState({ isCorrectAnswer: false });
    }
  }

  checkAnswers = (isCorrect) => (isCorrect ? 'm5 btn green' : 'm5 btn red');

  render() {
    const { isClicked, isCorrectAnswer, shuffledQuestions } = this.state;
    const { quest: {
      category,
      question,
    } } = this.props;

    return (
      <section className="question-container">
        <h4 data-testid="question-category">{category}</h4>
        { !isClicked
          && <img src={ ampulheta } alt="ampulheta" className="img rotate-center" />}
        { isClicked
          && <img
            src={ isCorrectAnswer ? check : wrong }
            alt={ isCorrectAnswer ? 'check' : 'wrong' }
            className="img"
          />}
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

TriviaQuestion.propTypes = {
  quest: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
