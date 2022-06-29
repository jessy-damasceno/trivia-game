import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <header>
        <span data-testid="header-player-name">{name}</span>
        <img
          data-testid="header-profile-picture"
          className="gravatar-icon"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}` }
          alt="gravatar"
        />
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
