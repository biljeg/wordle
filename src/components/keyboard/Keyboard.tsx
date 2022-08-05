import { FC } from "react";
import styled from "styled-components/macro";
import Delete from "../../assets/icons/backspace-fill.svg";
import { GuessedLetter } from "../../App";

const keyboardTopRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keyboardMiddleRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keyboardBottomRow = ["z", "x", "c", "v", "b", "n", "m"];

interface KeyboardProps {
  handleKeyPress: (key: string) => void;
  guessedLetters: GuessedLetter[];
}

const Keyboard: FC<KeyboardProps> = ({ handleKeyPress, guessedLetters }) => {
  return (
    <KeyboardContainer>
      <Row>
        {keyboardTopRow.map(letter => (
          <Key onClick={() => handleKeyPress(letter)} key={letter}>
            {letter}
          </Key>
        ))}
      </Row>
      <Row>
        {keyboardMiddleRow.map(letter => (
          <Key onClick={() => handleKeyPress(letter)} key={letter}>
            {letter}
          </Key>
        ))}
      </Row>
      <Row>
        <Key onClick={() => handleKeyPress("enter")}>Enter</Key>
        {keyboardBottomRow.map(letter => (
          <Key onClick={() => handleKeyPress(letter)} key={letter}>
            {letter}
          </Key>
        ))}
        <Key onClick={() => handleKeyPress("delete")}>
          <img src={Delete} alt="" />
        </Key>
      </Row>
    </KeyboardContainer>
  );
};

export default Keyboard;

const KeyboardContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

const Key = styled.button`
  appearance: none;
  border: none;
  background-color: lightgray;
  border-radius: 4px;
  height: 58px;
  min-width: 40px;
  font-size: 2rem;
  margin-right: 6px;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
`;
