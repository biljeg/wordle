import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styled, { css, keyframes } from "styled-components/macro";
import toast from "react-hot-toast";

import validWords from "../../data/validWords.json";
import { DarkModeContext, checkTile, GameState } from "../../App";

interface BoardProps {
  pressedKey: {
    key: string;
    updated: boolean;
  };
  solution: string;
  setGameState: Dispatch<SetStateAction<GameState>>;
  setGuess: Dispatch<SetStateAction<string[]>>;
  playAgain: boolean;
}

type Row = string[];

const Board: FC<BoardProps> = ({
  pressedKey,
  solution,
  setGameState,
  setGuess,
  playAgain,
}) => {
  const [activeRow, setActiveRow] = useState(0);
  const [incorrectWord, setIncorrectWord] = useState(-1);
  const [boardState, setBoardState] = useState<Row[]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const darkMode = useContext(DarkModeContext);

  const guessWord = (): void => {
    const letters = boardState[activeRow];
    if (letters[4] === "") return;
    const guess = letters.join("");

    if (!validWords.includes(guess)) {
      if (darkMode) {
        toast("Not in word list");
      } else {
        toast("Not in word list", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
      setIncorrectWord(activeRow);
    } else {
      setGuess(letters);
      if (solution === guess) {
        toast.success("Word guessed!");
        setGameState({
          gameOver: true,
          condition: "win",
        });
        setActiveRow(activeRow + 1);
      } else if (activeRow === 5) {
        toast.error("Game over");
        setGameState({
          gameOver: true,
          condition: "loss",
        });
        setActiveRow(activeRow + 1);
      } else {
        setActiveRow(activeRow + 1);
      }
    }
  };

  const updateLetter = (): void => {
    setBoardState(prevState =>
      prevState.map((row, rowIdx) => {
        if (rowIdx === activeRow) {
          const index = row.findIndex(tile => tile === "");
          if (index === -1) return row;
          row[index] = pressedKey.key;
        }
        return row;
      })
    );
  };

  const deleteLetter = (): void => {
    setBoardState(prevState =>
      prevState.map((row, rowIdx) => {
        if (rowIdx === activeRow) {
          if (row[0] === "") return row;
          const index = row.findIndex(tile => tile === "");
          if (index === -1) {
            row[4] = "";
          } else {
            row[index - 1] = "";
          }
        }
        return row;
      })
    );
  };

  useEffect(() => {
    if (pressedKey.key === "enter") {
      guessWord();
    } else if (pressedKey.key === "delete") {
      deleteLetter();
    } else {
      updateLetter();
    }
  }, [pressedKey]);

  useEffect(() => {
    setBoardState([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setActiveRow(0);
  }, [playAgain]);

  console.log(incorrectWord);

  return (
    <BoardGrid>
      {boardState.map((row, rowIdx) => {
        if (rowIdx < activeRow) {
          return (
            <Row key={rowIdx}>
              {row.map((tile, tileIdx) => {
                const tileInfo = checkTile(tile, tileIdx, solution);
                return (
                  <Tile
                    key={tileIdx}
                    inWord={tileInfo.inWord}
                    correctSpot={tileInfo.correctSpot}
                    incorrect={tileInfo.incorrect}
                    darkMode={darkMode}
                    pop={tile !== ""}
                  >
                    {tile}
                  </Tile>
                );
              })}
            </Row>
          );
        } else {
          return (
            <Row
              key={rowIdx}
              incorrect={incorrectWord === activeRow && activeRow === rowIdx}
              // I would usually use animation library to handle repeated clicks
              onAnimationEnd={() => setIncorrectWord(-1)}
            >
              {row.map((tile, tileIdx) => (
                <Tile
                  key={tileIdx}
                  inWord={false}
                  correctSpot={false}
                  incorrect={false}
                  darkMode={darkMode}
                  pop={tile !== ""}
                >
                  {tile}
                </Tile>
              ))}
            </Row>
          );
        }
      })}
    </BoardGrid>
  );
};

export default Board;

const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  width: 322px;
  height: 384px;
`;

const incorrectWord = keyframes`
  0%{
    transform: translateX(0);
  }
  20%{
    transform: translateX(-5px);
  }
  40%{
    transform: translateX(5px);
  }
  60%{
    transform: translateX(-5px);
  }
  80%{
    transform: translateX(5px);
  }
  100%{
    transform: translateX(0);
  }
`;

const Row = styled.div<{
  incorrect?: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  ${({ incorrect }) =>
    incorrect &&
    css`
      animation: ${incorrectWord} 0.5s;
    `}
`;

const onType = keyframes`
  0%{
    scale: 1;
  }
  50%{
scale: 1.1;
  }
  100%{
scale: 1;
  }
`;

const Tile = styled.div<{
  inWord?: boolean;
  correctSpot?: boolean;
  incorrect?: boolean;
  darkMode: boolean;
  pop?: boolean;
}>`
  width: 56.4px;
  height: 56.4px;
  display: flex;
  color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-7)" : "var(--color-tone-1)"};
  border: ${({ darkMode }) =>
    darkMode
      ? "1px solid var(--color-tone-3)"
      : "1px solid var(--color-tone-4)"};
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  ${({ pop }) =>
    pop &&
    css`
      animation: ${onType} 0.1s ease-in;
    `}
  ${({ incorrect, darkMode }) =>
    incorrect &&
    css`
      background-color: var(--color-tone-12);
      border: ${darkMode
        ? "1px solid var(--color-tone-8)"
        : "1px solid var(--color-tone-7)"};
      color: var(--color-tone-7);
    `}
  ${({ inWord, darkMode }) =>
    inWord &&
    css`
      background-color: var(--darkendYellow);
      border: ${darkMode
        ? "1px solid var(--color-tone-8)"
        : "1px solid var(--color-tone-7)"};
      color: var(--color-tone-7);
    `}
  ${({ correctSpot, darkMode }) =>
    correctSpot &&
    css`
      background-color: var(--darkendGreen);
      border: ${darkMode
        ? "1px solid var(--color-tone-8)"
        : "1px solid var(--color-tone-7)"};
      color: var(--color-tone-7);
    `}
`;
