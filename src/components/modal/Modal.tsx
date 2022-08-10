import { Dispatch, FC, SetStateAction, useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components/macro";
import { Button } from "@mantine/core";

import { DarkModeContext, GameState } from "../../App";

interface ModalProps {
  gameState: GameState;
  setPlayAgain: Dispatch<SetStateAction<boolean>>;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: FC<ModalProps> = ({ gameState, setPlayAgain }) => {
  if (!gameState.gameOver) return null;
  const darkMode = useContext(DarkModeContext);

  const playAgain = (): void => {
    setPlayAgain(prevState => !prevState);
  };

  return createPortal(
    <>
      <Overlay onClick={playAgain} />
      {gameState.condition === "win" ? (
        <ModalWrapper darkMode={darkMode}>
          <ModalHeader darkMode={darkMode}>
            <H3>You won!</H3>
            <CloseIcon
              onClick={playAgain}
              darkMode={darkMode}
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              data-testid="icon-close"
            >
              <path
                fill="var(--color-tone-1)"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </CloseIcon>
          </ModalHeader>
          <ModalContent darkMode={darkMode}>
            <Button
              onClick={playAgain}
              color="dark"
              variant={darkMode ? "white" : "default"}
            >
              Play again
            </Button>
          </ModalContent>
        </ModalWrapper>
      ) : (
        <ModalWrapper darkMode={darkMode}>
          <ModalHeader darkMode={darkMode}>
            <H3>You lost.</H3>
            <CloseIcon
              onClick={playAgain}
              darkMode={darkMode}
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              data-testid="icon-close"
            >
              <path
                fill="var(--color-tone-1)"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </CloseIcon>
          </ModalHeader>
          <ModalContent darkMode={darkMode}>
            <Button
              onClick={playAgain}
              color="dark"
              variant={darkMode ? "white" : "default"}
            >
              Try again
            </Button>
          </ModalContent>
        </ModalWrapper>
      )}
    </>,
    modalRoot
  );
};

export default Modal;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  animation: 200ms ease-out 0s 1 normal none running fadeIn;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div<{
  darkMode: boolean;
}>`
  min-width: 320px;
  border-radius: 1.6rem;
  animation: 200ms ease-out 0s 1 normal none running fadeIn;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: ${({ darkMode }) =>
    darkMode ? " var(--color-tone-7)" : "var(--color-tone-1)"};
  background-color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-8)" : "var(--color-tone-7)"};
`;

const ModalContent = styled.div<{
  darkMode: boolean;
}>`
  display: flex;
  justify-content: center;
  padding: 0 1rem 2.5rem 1rem;
  border: ${({ darkMode }) =>
    darkMode
      ? "1px solid var(--color-tone-3)"
      : "1px solid var(--color-tone-4)"};
  border-top: none;
`;

const ModalHeader = styled.div<{
  darkMode: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 64px;
  border: ${({ darkMode }) =>
    darkMode
      ? "1px solid var(--color-tone-3)"
      : "1px solid var(--color-tone-4)"};
  color: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-7)" : "var(--color-tone-1)"};
  border-bottom: none;
`;

const CloseIcon = styled.svg<{
  darkMode: boolean;
}>`
  fill: ${({ darkMode }) =>
    darkMode ? "var(--color-tone-1)" : "var(--color-tone-7)"};
  cursor: pointer;
  position: absolute;
  right: 15px;
`;

const H3 = styled.h3`
  font-size: 1.6rem;
`;
