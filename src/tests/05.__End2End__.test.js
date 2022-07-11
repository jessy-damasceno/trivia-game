import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";

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

describe('End to End App test', () => {
  jest.setTimeout(50000);
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => MOCK_VALID_CODE_DATA,
    }));
  })

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  })

  it('Testing all aplication', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
  
    expect(screen.getByTestId('btn-play')).not.toBeDisabled();
    userEvent.click(screen.getByTestId('btn-play'));

    await screen.findByTestId('question-category');

    await screen.findByText('0', {}, {timeout:35000});
    
    expect(history.location.pathname).toBe('/trivia');
    const correct_answer = await screen.findByTestId('correct-answer');
    await waitFor(() => expect(correct_answer).toBeDisabled(), {timeout:35000});

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));     

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(history.location.pathname).toBe('/feedback');
  });
});
