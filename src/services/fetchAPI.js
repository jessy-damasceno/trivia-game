const URL = 'https://opentdb.com/api_token.php?command=request';
const KEY = 'token';

const getToken = () => fetch(URL).then((response) => response.json())
  .then((json) => localStorage.setItem(KEY, json.token));

export default getToken;
