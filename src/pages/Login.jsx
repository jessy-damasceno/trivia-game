import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPlayer } from '../redux/actions';
import '../styles/Login.css';
import getToken from '../services/fetchAPI';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  isDisabled: false,
};

class Login extends React.Component {
  state = {
    ...INITIAL_STATE,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { name, gravatarEmail } = this.state;
    const { setPlayerAction, history } = this.props;

    history.push('/trivia');
    setPlayerAction(name, gravatarEmail);
    await getToken();
  }

  render() {
    const { history } = this.props;
    const { gravatarEmail, name } = this.state;
    const regExp = /\w+@[a-z]+\.com/g;
    let { isDisabled } = this.state;
    const magicNumber = 3;

    if (gravatarEmail.match(regExp) && name.length >= magicNumber) {
      isDisabled = true;
    }

    return (
      <section className="login__page">
        <form>
          <span className="text-center">login</span>
          <div className="input-container">
            <input
              placeholder="nome"
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </div>
          <div className="input-container">
            <input
              placeholder="e-mail"
              data-testid="input-gravatar-email"
              type="email"
              name="gravatarEmail"
              id="gravatarEmail"
              onChange={ this.handleChange }
              value={ gravatarEmail }
            />
          </div>
          <button
            type="button"
            data-testid="btn-play"
            className={ !isDisabled ? 'btn mt-50 disabled' : 'btn mt-50' }
            onClick={ this.handleClick }
            disabled={ !isDisabled }
          >
            Play!
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="btn mt-50"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerAction: (name, email) => dispatch(setPlayer(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setPlayerAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
