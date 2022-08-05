import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import GlobalStyles from "./components/styles/globalStyles";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { Toaster } from "react-hot-toast";

//NOW
// add colors to theme
// add dark theme
// remove unneeded fonts
// add eslint and others to make it github worthy
// add all styles like in original

export interface GuessedLetter {
  idx: number;
  key: string;
  correctSpot: boolean;
  onWord: boolean;
}

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<GuessedLetter[]>([]);
  const [pressedKey, setPressedKey] = useState({
    key: "",
    hasUpdated: false,
  });

  console.log(guessedLetters);

  const handleKeyPress = (key: string): void => {
    setPressedKey({ key, hasUpdated: !pressedKey.hasUpdated });
  };

  return (
    <>
      <Toaster />
      <Header>
        <H1>Wordle</H1>
      </Header>
      <Main>
        <Section>
          <Board
            pressedKey={pressedKey}
            setIsGameOver={setIsGameOver}
            setGuessedLetters={setGuessedLetters}
          />
        </Section>
        <Keyboard
          handleKeyPress={handleKeyPress}
          guessedLetters={guessedLetters}
        />
      </Main>
      <GlobalStyles />
    </>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  height: 64px;
`;

const Main = styled.main`
  margin: 0 auto;
  width: min(500px, 90vw);
  min-height: 100vh - 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 3.2rem;
  font-family: "Roboto Slab", serif;
`;
