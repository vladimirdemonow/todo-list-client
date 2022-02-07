import React, { useEffect, useRef, useState } from "react";
import { IEnterTaskProps } from "../../components/InputTaskComponent/InputTaskComponent";
import styles from "./InputTaskController.module.scss";

type TInputTask = "create_task" | "edit_task";

export interface IEnteredTextState {
  text: string;
  escaped: boolean;
}

const maxInputCount = 100;

interface IInputTaskProps {
  inputType: TInputTask;
  inputTaskRef: React.RefObject<HTMLInputElement>;
  setEnteredTextState: React.Dispatch<React.SetStateAction<IEnteredTextState>>;
  styleLeftCount: string;
  defaultText?: string | "";
}

export default ({
  inputType,
  inputTaskRef,
  setEnteredTextState,
  styleLeftCount,
  defaultText = "",
}: IInputTaskProps): JSX.Element => {
  const [countLeftInputState, setCountLeftInputState] = useState(maxInputCount);

  return (
    <div className={styles.form__group}>
      <InputTaskText
        inputType={inputType}
        inputTaskRef={inputTaskRef}
        setCountLeftInputState={setCountLeftInputState}
        setEnteredTextState={setEnteredTextState}
        defaultText={defaultText}
      />
      {countLeftInputState < maxInputCount ? (
        <LeftTextCounter
          leftTextCount={countLeftInputState}
          styleLeftCount={styleLeftCount}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

interface IInputTaskTextProps {
  inputType: TInputTask;
  inputTaskRef: React.RefObject<HTMLInputElement>;
  setCountLeftInputState: React.Dispatch<React.SetStateAction<number>>;
  setEnteredTextState: React.Dispatch<React.SetStateAction<IEnteredTextState>>;
  defaultText: string | "";
}

function InputTaskText({
  inputType,
  inputTaskRef,
  setCountLeftInputState,
  setEnteredTextState,
  defaultText,
}: IInputTaskTextProps): JSX.Element {
  const onPressButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputTaskRef.current) return;

    const key = event.key;

    if (key === "Backspace") return;

    if (key === "Enter") {
      let { value } = inputTaskRef.current;
      setEnteredTextState({
        text: inputTaskRef.current.value,
        escaped: false,
      });
      inputTaskRef.current.value = "";
      setCountLeftInputState(maxInputCount);

      if (!value || value.length > maxInputCount) {
        return;
      }
    }

    if (key === "Escape") {
      inputTaskRef.current.value = "";
      setCountLeftInputState(maxInputCount);

      setEnteredTextState({
        text: " ",
        escaped: true,
      });
    }

    if (inputTaskRef.current.value.length >= maxInputCount) {
      event.preventDefault();
      return;
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputTaskRef.current) return;
    setCountLeftInputState(maxInputCount - inputTaskRef.current.value.length);
  };

  return (
    <input
      ref={inputTaskRef}
      onKeyDownCapture={onPressButton}
      onChange={onChangeInput}
      className={styles.form__field}
      defaultValue={defaultText}
      autoFocus
    />
  );
}

interface ILeftTextCounterProps {
  leftTextCount: number;
  styleLeftCount: string;
}

function LeftTextCounter({
  leftTextCount,
  styleLeftCount,
}: ILeftTextCounterProps): JSX.Element {
  return <div className={styleLeftCount}>{leftTextCount}</div>;
}
