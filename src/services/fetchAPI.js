const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_URL = 'https://opentdb.com/api.php?amount=5&token=';
export const KEY = 'token';

export const getToken = () => fetch(TOKEN_URL).then((response) => response.json())
  .then((json) => localStorage.setItem(KEY, json.token));

export const getTriviaQuestions = () => {
  const token = localStorage.getItem(KEY);
  if (token) {
    return fetch(TRIVIA_URL + token).then((response) => response.json());
  }
};
