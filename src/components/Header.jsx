import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <span data-testid="header-player-name">{name}</span>
        <img
          data-testid="header-profile-picture"
          className="gravatar-icon"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}` }
          alt="gravatar"
        />
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
