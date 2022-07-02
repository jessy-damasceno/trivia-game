const KEY = 'ranking';

export const getRanking = () => JSON.parse(localStorage.getItem(KEY));

export const setRanking = (ranking) => {
  const rankingList = getRanking();
  if (rankingList) {
    const newRankingList = [...rankingList, ranking].sort((a, b) => b.score - a.score);
    localStorage.setItem(KEY, JSON.stringify(newRankingList));
  } else {
    localStorage.setItem(KEY, JSON.stringify([ranking]));
  }
};
