import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";

const MOCK_INVALID_CODE = {
  json: () => ({
    "response_code": 3,
  }),
};

const MOCK_VALID_CODE_DATA = {
  response_code: 0,
  results: [
    {
      "category": "Geography",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The Republic of Malta is the smallest microstate worldwide.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "Science & Nature",
      "type": "multiple",
      "difficulty": "hard",
      "question": "In quantum physics, which of these theorised sub-atomic particles has yet to be observed?",
      "correct_answer": "Graviton",
      "incorrect_answers": [
        "Z boson",
        "Tau neutrino",
        "Gluon"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Generally, which component of a computer draws the most power?",
      "correct_answer": "Video Card",
      "incorrect_answers": [
        "Hard Drive",
        "Processor",
        "Power Supply"
      ]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What is the most expensive weapon in Counter-Strike: Global Offensive?",
      "correct_answer": "Scar-20/G3SG1",
      "incorrect_answers": [
        "M4A1",
        "AWP",
        "R8 Revolver"
      ]
    },
    {
      "category": "Entertainment: Japanese Anime & Manga",
      "type": "multiple",
      "difficulty": "hard",
      "question": "Who was the Author of the manga Uzumaki?",
      "correct_answer": "Junji Ito",
      "incorrect_answers": [
        "Noboru Takahashi",
        "Akira Toriyama",
        "Masashi Kishimoto",
      ],
    },
  ],
};

const INPUT_PLAYER = 'input-player-name';
const INPUT_EMAIL = 'input-gravatar-email';
const BUTTON_PLAY = 'btn-play';

// jest.useFakeTimers();
describe('Teste tela de Game', () => {

  it('Teste se a página é redirecionada se o token for inválido', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(MOCK_INVALID_CODE);

    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(INPUT_PLAYER), 'juninho');
    userEvent.type(screen.getByTestId(INPUT_EMAIL), 'juninho@trybe.com');
    userEvent.click(screen.getByTestId(BUTTON_PLAY));

    expect(localStorage.getItem('token')).toBe(null);
  });

  it('Teste se a tela de Game é renderizada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_VALID_CODE_DATA),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(INPUT_PLAYER), 'juninho');
    userEvent.type(screen.getByTestId(INPUT_EMAIL), 'juninho@trybe.com');
    userEvent.click(screen.getByTestId(BUTTON_PLAY));

    await waitFor(() => expect(screen.getByText('The Republic of Malta is the smallest microstate worldwide.')).toBeInTheDocument());

    userEvent.click(screen.getByTestId('correct-answer'));

    await waitFor(() => expect(screen.getByTestId('btn-next')).toBeInTheDocument());

    userEvent.click(screen.getByTestId('btn-next'));

    screen.getByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
    
  });
});
