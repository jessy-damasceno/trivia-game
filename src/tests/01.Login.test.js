import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react';
import { screen } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";

const PLAYER_NAME_TEST_ID = 'input-player-name';
const PLAYER_EMAIL_TEST_ID = 'input-gravatar-email';
const LOGIN_BUTTON_TEST_ID = 'btn-play';
const SETTINGS_BUTTON_TEST_ID = 'btn-settings';

describe('1. Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', () => {
  it('Será validado se a tela de login está criada corretamente', () => {
    renderWithRouterAndRedux(<App/>)

    const inputName = screen.getByTestId(PLAYER_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(PLAYER_EMAIL_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    expect(inputName).toHaveProperty('type', 'text');
    expect(inputEmail).toHaveProperty('type', 'email');

    expect(inputName).toHaveValue('');
    expect(inputEmail).toHaveValue('');
    expect(loginButton).toBeDisabled();
  });

  it('Testa se o botão PLAY habilita somente com os dois campos preenchidos', () => {
    renderWithRouterAndRedux(<App/>)

    const inputName = screen.getByTestId(PLAYER_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(PLAYER_EMAIL_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    userEvent.type(inputName, 'Carlinhos');
    expect(inputName).toHaveValue('Carlinhos');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'carlinhos-do-fut@trybe.com');
    expect(inputEmail).toHaveValue('carlinhos-do-fut@trybe.com');

    expect(loginButton).not.toBeDisabled();
  });

  it('Testa se o botão PLAY permanece desabilitado se apenas o campo nome for preenchido', () => {
    renderWithRouterAndRedux(<App/>)

    const inputEmail = screen.getByTestId(PLAYER_EMAIL_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    userEvent.type(inputEmail, 'xablau@trybe.com');
    expect(inputEmail).toHaveValue('xablau@trybe.com');

    expect(loginButton).toBeDisabled();
  });

  it('Testa se, ao clicar no botão PLAY, a página é redirecionada para a tela de jogo', () => {
    const { history } = renderWithRouterAndRedux(<App/>)

    const inputName = screen.getByTestId(PLAYER_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(PLAYER_EMAIL_TEST_ID);
    const loginButton = screen.getByTestId(LOGIN_BUTTON_TEST_ID);

    userEvent.type(inputName, 'Carlinhos');
    userEvent.type(inputEmail, 'carlinhos-do-fut@trybe.com');

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/trivia');
  });

  it('Testa o botão de settings', () => {
    const { history } = renderWithRouterAndRedux(<App/>)

    const settingsButton = screen.getByTestId(SETTINGS_BUTTON_TEST_ID);

    expect(settingsButton).toBeInTheDocument();

    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  })
})