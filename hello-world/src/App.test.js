import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './App';


describe("testing the rendering of square component", () => {
  it("should render status as next player is X initially", () => {
    const { getByText } = render(<Game />);
    const text = getByText('Next player: X');
    expect(text).toBeInTheDocument();
  });

  it("should render status as next player is O after X turn", () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole("button")[0]);

    const text = getByText('Next player: O');
    expect(text).toBeInTheDocument();
  });
  it("should render X and O alternatively in buttons", () => {
      const { getAllByRole } = render(<Game />);
      const firstSquare = getAllByRole("button")[0];
  
      fireEvent.click(firstSquare);
      expect(firstSquare).toHaveTextContent("X");
  
      const secondSquare = getAllByRole("button")[1];
      fireEvent.click(secondSquare);
  
      expect(secondSquare).toHaveTextContent("O");
      });
});
describe('Game', () => {
  test('renders without errors', () => {
    render(<Game />);
  });
  it('allows X and O to take turns', () => {
    const { getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X's turn
    expect(squares[0].textContent).toBe('X');

    fireEvent.click(squares[1]); // O's turn
    expect(squares[1].textContent).toBe('O');

    fireEvent.click(squares[2]); // X's turn
    expect(squares[2].textContent).toBe('X');
  });

  it("update next player", () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole("button")[0]); // X
    fireEvent.click(getAllByRole("button")[1]); // O
    fireEvent.click(getAllByRole("button")[2]); // X

    const moveOne = getByText("Go to move #1");
    fireEvent.click(moveOne);
    expect(moveOne).toBeInTheDocument();

    const player = getByText("Go to game start");
    expect(player).toBeInTheDocument();
  });
  it("go back to the first move", () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole("button")[0]); // X
    fireEvent.click(getAllByRole("button")[1]); // O
    fireEvent.click(getAllByRole("button")[2]); // X

    const moveOne = getByText(/Go to move #1/i);
    fireEvent.click(moveOne);

    expect(getAllByRole("button")[0]).toHaveTextContent("X");
    expect(getAllByRole("button")[1]).toHaveTextContent("");
    expect(getAllByRole("button")[2]).toHaveTextContent("");
  });
  it("to have reset button", () => {
    const { getByText } = render(<Game />);
    const reset = getByText(/Go to game start/i);
    expect(reset).toBeInTheDocument();
  });

  it("render Winner X when game ends", () => {
    const { getByText, getAllByRole } = render(<Game />);

    const numbers = [0, 6, 1, 7, 2];
    for (let i = 0; i < numbers.length; i++) {
      fireEvent.click(getAllByRole("button")[numbers[i]]);
    }

    const text = getByText(/Winner: X/i);
    expect(text).toBeInTheDocument();
  });

});
describe("<Square />", () => {
  it("render next player is X", () => {
    const { getByText } = render(<Game />);
    const text = getByText(/Next player: X/i);
    expect(text).toBeInTheDocument();
  });

  it("render next player is O", () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole("button")[0]);

    const text = getByText(/Next player: O/i);
    expect(text).toBeInTheDocument();
  });

  it("Square component renders X and O", () => {
    const { getAllByRole } = render(<Game />);
    const firstSquare = getAllByRole("button")[0];

    fireEvent.click(firstSquare);
    expect(firstSquare).toHaveTextContent("X");

    const secondSquare = getAllByRole("button")[1];
    fireEvent.click(secondSquare);

    expect(secondSquare).toHaveTextContent("O");
  });
});


