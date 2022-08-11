import { FC, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";
//use react inline svg like on stackoverflow
import Delete from "../../assets/icons/backspace-fill.svg";
import defaultKeys from "./defaultKeys";
import { DarkModeContext, checkTile } from "../../App";

interface KeyboardProps {
  handleKeyPress: (key: string) => void;
  guess: string[];
  solution: string;
  playAgain: boolean;
}

const Keyboard: FC<KeyboardProps> = ({
  guess,
  solution,
  handleKeyPress,
  playAgain,
}) => {
  const [keyboardState, setKeyboardState] = useState(defaultKeys);
  const darkMode = useContext(DarkModeContext);

  useEffect(() => {
    setKeyboardState(
      keyboardState.map(letter => {
        guess.forEach((guessLetter, guessLetterIdx) => {
          if (!(letter.key === guessLetter)) return;
          const { inWord, correctSpot, incorrect } = checkTile(
            guessLetter,
            guessLetterIdx,
            solution
          );
          letter.correctSpot = correctSpot;
          letter.inWord = inWord;
          letter.incorrect = incorrect;
        });
        return letter;
      })
    );
  }, [guess]);

  useEffect(() => {
    setKeyboardState(defaultKeys);
  }, [playAgain]);

  return (
    <KeyboardContainer>
      <Row>
        {keyboardState.map(letter => {
          if (!(letter.position === "top-row")) return;
          return (
            <Key
              onClick={() => handleKeyPress(letter.key)}
              key={letter.key}
              inWord={letter.inWord}
              correctSpot={letter.correctSpot}
              incorrect={letter.incorrect}
              darkMode={darkMode}
            >
              {letter.key}
            </Key>
          );
        })}
      </Row>
      <Row>
        <OneHalf></OneHalf>
        {keyboardState.map(letter => {
          if (!(letter.position === "middle-row")) return;
          return (
            <Key
              onClick={() => handleKeyPress(letter.key)}
              key={letter.key}
              inWord={letter.inWord}
              correctSpot={letter.correctSpot}
              incorrect={letter.incorrect}
              darkMode={darkMode}
            >
              {letter.key}
            </Key>
          );
        })}
        <OneHalf></OneHalf>
      </Row>
      <Row>
        <OneAndAHalf
          onClick={() => handleKeyPress("enter")}
          darkMode={darkMode}
        >
          Enter
        </OneAndAHalf>
        {keyboardState.map(letter => {
          if (!(letter.position === "bottom-row")) return;
          return (
            <Key
              onClick={() => handleKeyPress(letter.key)}
              key={letter.key}
              inWord={letter.inWord}
              correctSpot={letter.correctSpot}
              incorrect={letter.incorrect}
              darkMode={darkMode}
            >
              {letter.key}
            </Key>
          );
        })}
        <OneAndAHalf
          onClick={() => handleKeyPress("delete")}
          darkMode={darkMode}
        >
          <DeleteIcon
            darkMode={darkMode}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
          </DeleteIcon>
        </OneAndAHalf>
      </Row>
    </KeyboardContainer>
  );
};

export default Keyboard;

const KeyboardContainer = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

const DeleteIcon = styled.svg<{
  darkMode: boolean;
}>`
  fill: ${({ darkMode }) =>
    darkMode ? " var(--color-tone-7)" : "var(--color-tone-1)"};
`;

const Key = styled.button<{
  inWord?: boolean;
  correctSpot?: boolean;
  incorrect?: boolean;
  darkMode: boolean;
}>`
  appearance: none;
  border: none;
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--gray)" : "var(--color-tone-4)"};
  color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-7)" : "var(--color-tone-1)"};
  border-radius: 4px;
  height: 58px;
  font-size: 1.4rem;
  margin-right: 6px;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  flex: 1;
  ${({ incorrect }) =>
    incorrect &&
    css`
      background-color: var(--color-tone-12);
    `}
  ${({ inWord }) =>
    inWord &&
    css`
      background-color: var(--darkendYellow);
    `}
  ${({ correctSpot }) =>
    correctSpot &&
    css`
      background-color: var(--darkendGreen);
    `}
`;

const OneAndAHalf = styled(Key)`
  flex: 1.5;
`;

const OneHalf = styled.div`
  flex: 0.5;
`;
