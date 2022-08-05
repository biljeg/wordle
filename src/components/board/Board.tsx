import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components/macro";
import wordBank from "../../data/wordBank.json";
import validWords from "../../data/validWords.json";
import toast from "react-hot-toast";
import { GuessedLetter } from "../../App";

interface BoardProps {
  pressedKey: {
    key: string;
    hasUpdated: boolean;
  };
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  setGuessedLetters: Dispatch<SetStateAction<GuessedLetter[]>>;
}

interface RowState {
  id: number;
  tiles: string[];
}

const Board: FC<BoardProps> = ({
  pressedKey,
  setIsGameOver,
  setGuessedLetters,
}) => {
  const [correctWord, setCorrectWord] = useState("");
  const [activeRow, setActiveRow] = useState(1);
  const [boardState, setBoardState] = useState<RowState[]>([
    {
      id: 1,
      tiles: ["", "", "", "", ""],
    },
    {
      id: 2,
      tiles: ["", "", "", "", ""],
    },
    {
      id: 3,
      tiles: ["", "", "", "", ""],
    },
    {
      id: 4,
      tiles: ["", "", "", "", ""],
    },
    {
      id: 5,
      tiles: ["", "", "", "", ""],
    },
    {
      id: 6,
      tiles: ["", "", "", "", ""],
    },
  ]);

  const guessWord = (letters: string[]): void => {
    if (letters[4] === "") return;
    const guess = boardState[activeRow - 1].tiles.join("");

    console.log(`correct word: ${correctWord}`);
    console.log(`guess: ${guess}`);
    // console.log(validWords.includes(guess));

    if (!validWords.includes(guess)) {
      toast.error("Not on word list");
    } else if (correctWord === guess) {
      toast.success("Word guessed!");
      setIsGameOver(true);
    } else if (activeRow === 6) {
      toast.error("Game over");
    } else {
      const correctLetters = correctWord.split("");
      const guessedLetters: GuessedLetter[] = letters.map(
        (letter, letterIdx) => {
          const newLetter = {
            idx: letterIdx,
            key: letter,
            correctSpot: false,
            onWord: false,
          };
          correctLetters.forEach((correctLetter, correctLetterIdx) => {
            if (correctLetter === letter && correctLetterIdx === letterIdx) {
              newLetter.correctSpot = true;
              newLetter.onWord = true;
            } else if (correctLetter === letter) {
              newLetter.onWord = true;
            }
          });
          return newLetter;
        }
      );
      setGuessedLetters(guessedLetters);
      setActiveRow(activeRow + 1);
    }
    //check if word is on word list +
    //check if it the right word +
    //check if any letters add up
    // -if they are in the right position and in the word
    // -if they are in the word but not right position
    // go to next row
  };

  const updateLetter = (): void => {
    setBoardState(prevState =>
      prevState.map(row => {
        if (row.id === activeRow) {
          const index = row.tiles.findIndex(tile => tile === "");
          row.tiles[index] = pressedKey.key;
          return {
            ...row,
          };
        } else {
          return row;
        }
      })
    );
  };

  const deleteLetter = (): void => {
    setBoardState(prevState =>
      prevState.map(row => {
        if (row.id === activeRow) {
          const index = row.tiles.findIndex(tile => tile === "");
          if (index === -1) {
            row.tiles[4] = "";
          } else {
            row.tiles[index - 1] = "";
          }
          return {
            ...row,
          };
        } else {
          return row;
        }
      })
    );
  };

  useEffect(() => {
    setCorrectWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
  }, []);

  useEffect(() => {
    if (pressedKey.key === "enter") {
      const letters = boardState[activeRow - 1].tiles;
      guessWord(letters);
    } else if (pressedKey.key === "delete") {
      deleteLetter();
    } else {
      updateLetter();
    }
  }, [pressedKey]);

  return (
    <BoardGrid>
      {boardState.map(row => (
        <Row key={row.id}>
          {row.tiles.map((tile, idx) => (
            <Tile key={idx}>{tile}</Tile>
          ))}
        </Row>
      ))}
    </BoardGrid>
  );
};

export default Board;

const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const Tile = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  border: 2px solid black;
  text-transform: uppercase;
`;
