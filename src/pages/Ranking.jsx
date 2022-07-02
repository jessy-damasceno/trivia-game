import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import { getRanking } from '../services/rankingStorage';
import { setReset } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    rankingList: [],
  }

  componentDidMount() {
    this.setState({ rankingList: getRanking() });
  }

  onClick = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  };
  
  render() {
    const { rankingList } = this.state;
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
        {rankingList?.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
            <img src={ `https://www.gravatar.com/avatar/${MD5(player.picture).toString()}` } alt={ player.name } />
          </div>
        ))}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(setReset()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  reset: PropTypes.func.isRequired,
};
