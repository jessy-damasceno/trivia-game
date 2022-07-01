import PropTypes from 'prop-types';
import React from 'react';

export default class Ranking extends React.Component {
  onClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  playerRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (ranking.map((player) => (
      <div key={ player.name }>
        <p>{player.name}</p>
        <p>{player.score}</p>
        <img src={ player.picture } alt={ player.name } />
      </div>
    )));
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.onClick }
          data-testid="btn-go-home"
        >
          Voltar ao Início
        </button>
        {this.playerRanking}
      </>
    );
  }
}

Ranking.propTypes = {
  // assertions: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
