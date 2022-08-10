import { useState, useEffect, createContext } from "react";
import styled from "styled-components/macro";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./components/styles/globalStyles";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import Modal from "./components/modal";
import wordBank from "./data/wordBank.json";
import Moon from "./assets/icons/moon-fill.svg";
import Sun from "./assets/icons/sun.svg";

//NOW
// remove unneeded fonts
// remove unneeded colors
// add eslint and others to make it github worthy
// add all styles like in original and the animations

export const DarkModeContext = createContext(false);

export const checkTile = (
  letter: string,
  letterIdx: number,
  solution: string
): {
  correctSpot: boolean;
  inWord: boolean;
  incorrect: boolean;
} => {
  const tileInfo = {
    correctSpot: false,
    inWord: false,
    incorrect: false,
  };
  const correctLetters = solution.split("");
  correctLetters.forEach((correctLetter, correctLetterIdx) => {
    if (correctLetter === letter && correctLetterIdx === letterIdx) {
      tileInfo.correctSpot = true;
      tileInfo.inWord = true;
    } else if (correctLetter === letter) {
      tileInfo.inWord = true;
    } else {
      tileInfo.incorrect = true;
    }
  });
  return tileInfo;
};

export interface GameState {
  gameOver: boolean;
  condition: string;
}

const App = () => {
  const [solution, setSolution] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    gameOver: false,
    condition: "",
  });
  const [guess, setGuess] = useState<string[]>([]);
  const [pressedKey, setPressedKey] = useState({
    key: "",
    updated: false,
  });
  const [playAgain, setPlayAgain] = useState(false);

  const handleKeyPress = (key: string): void => {
    if (gameState.gameOver) return;
    setPressedKey({ key, updated: !pressedKey.updated });
  };

  const handleThemeSwitch = (): void => {
    setDarkMode(!darkMode);
  };
  console.log(gameState);

  useEffect(() => {
    setSolution(wordBank[Math.floor(Math.random() * wordBank.length)]);
    setGameState({
      gameOver: false,
      condition: "",
    });
    setGuess([]);
  }, [playAgain]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      <Toaster />
      <Modal gameState={gameState} setPlayAgain={setPlayAgain} />
      <Header darkMode={darkMode}>
        <H1>Wordle</H1>
        <ThemeSwitch onClick={handleThemeSwitch}>
          {darkMode ? (
            <Icon src={Moon} width="25px" height="25px" />
          ) : (
            <Icon src={Sun} width="25px" height="25px" />
          )}
        </ThemeSwitch>
      </Header>
      <Main darkMode={darkMode}>
        <BoardSection>
          <Board
            pressedKey={pressedKey}
            setGameState={setGameState}
            setGuess={setGuess}
            solution={solution}
            playAgain={playAgain}
          />
        </BoardSection>
        <KeyboardSection>
          <Keyboard
            handleKeyPress={handleKeyPress}
            guess={guess}
            solution={solution}
            playAgain={playAgain}
          />
        </KeyboardSection>
      </Main>
      <GlobalStyles />
    </DarkModeContext.Provider>
  );
};

export default App;

const Header = styled.header<{ darkMode: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  border-bottom: ${({ darkMode }) =>
    darkMode
      ? "1px solid var(--color-tone-3)"
      : "1px solid var(--color-tone-4)"};
  height: 64px;
  color: ${({ darkMode }) =>
    darkMode ? " var(--color-tone-7)" : "var(--color-tone-1)"};
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-8)" : "var(--color-tone-7)"};
`;

const Main = styled.main<{ darkMode: boolean }>`
  margin: 0 auto;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-8)" : "var(--color-tone-7)"};
`;

const BoardSection = styled.section`
  display: flex;
  justify-content: center;
  flex-grow: 1.5;
`;

const KeyboardSection = styled.section`
  display: flex;
  justify-content: center;
  max-width: 460px;
`;

const H1 = styled.h1`
  font-size: 3.2rem;
  font-family: "Roboto Slab", serif;
`;

const ThemeSwitch = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
  @media (min-width: var(--tablet)) {
    right: 25px;
  }
`;

const Icon = styled.img<{
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
