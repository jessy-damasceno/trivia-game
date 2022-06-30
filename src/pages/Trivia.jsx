import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getTriviaQuestions, KEY } from '../services/fetchAPI';
import TriviaQuestion from '../components/TriviaQuestion';

export default class Trivia extends React.Component {
  state = {
    questions: [],
    questNumber: 0,
  }

  componentDidMount() {
    this.getQuestionsToState();
  }

  getQuestionsToState = async () => {
    const { history } = this.props;
    const response = await getTriviaQuestions();

    if (response.response_code === 0) {
      this.setState({ questions: response.results });
    } else {
      localStorage.removeItem(KEY);
      history.push('/');
    }
  }

  render() {
    const { questions, questNumber } = this.state;

    return (
      <>
        <Header />
        {questions.length && <TriviaQuestion quest={ questions[questNumber] } />}
      </>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
