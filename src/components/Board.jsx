import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  const winngCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let combo of winngCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    return board.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isSinglePlayer && !isXNext) {
      setTimeout(() => autoPlay(), 500);
    }
  }, [board]);

  const autoPlay = () => {
    if (winner) return;

    const emptySquares = board
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val != null);

    if (emptySquares.length === 0) return;

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = "O";

    setBoard(newBoard);
    setIsXNext(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleModeChange = (mode) => {
    setIsSinglePlayer(mode);
    resetGame();
  };

  return (
    <>
      <div className="flex justify-center my-3">
        <button
          className={`px-4 py-2 text-sm sm:text-base rounded ${
            isSinglePlayer ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => handleModeChange(true)}
        >
          Single Player
        </button>
        <button
          className={`ml-2 px-4 py-2 text-sm sm:text-base  rounded ${
            !isSinglePlayer ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
          onClick={() => handleModeChange(false)}
        >
          Two Player
        </button>
      </div>
      <div className="h-12 flex justify-center items-center">
        {winner ? (
          <h2 className="text-3xl font-bold text-center text-green-500">
            {winner === "Draw" ? "😢 Match Draw!" : `🎉 ${winner} Wins! 🎉`}
          </h2>
        ) : (
          <h2 className="text-xl font-bold text-center">
            Player Turn: {isXNext ? "X" : "O"}
          </h2>
        )}
      </div>
      <div className="flex justify-center my-3 py-5">
        <div className="w-fit grid grid-cols-3 items-center justify-center">
          {board.map((value, index) => {
            return (
              <Square
                key={index}
                value={value}
                onClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      </div>
      <button
        className="block m-auto px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        onClick={resetGame}
      >
        🔄 Restart Game
      </button>
    </>
  );
};

export default Board;
