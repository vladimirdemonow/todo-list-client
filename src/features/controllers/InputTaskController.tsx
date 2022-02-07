import React, { useEffect, useRef, useState } from "react";
import { IEnterTaskProps } from "../../components/InputTaskComponent/InputTaskComponent";
import styles from "./InputTaskController.module.scss";

type TInputTask = "create_task" | "edit_task";

const maxInputCount = 100;

interface IOnEnterTask {
  (props: IEnterTaskProps): void;
}

interface IInputTaskProps {
  inputType: TInputTask;
  countLeftInputState: number;
  setCountLeftInputState: React.Dispatch<React.SetStateAction<number>>;
  inputTaskRef: React.RefObject<HTMLInputElement>;
  setEnteredTextState: React.Dispatch<React.SetStateAction<string>>;
}

export default ({
  inputType,
  countLeftInputState,
  setCountLeftInputState,
  inputTaskRef,
  setEnteredTextState,
}: IInputTaskProps): JSX.Element => {
  return (
    <div className={styles.form__group}>
      <InputTaskText
        inputType={inputType}
        inputTaskRef={inputTaskRef}
        setCountLeftInputState={setCountLeftInputState}
        setEnteredTextState={setEnteredTextState}
      />
      {countLeftInputState < maxInputCount ? (
        <LeftTextCounter leftTextCount={countLeftInputState} />
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
  setEnteredTextState: React.Dispatch<React.SetStateAction<string>>;
}

function InputTaskText({
  inputType,
  inputTaskRef,
  setCountLeftInputState,
  setEnteredTextState,
}: IInputTaskTextProps): JSX.Element {
  const onPressButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputTaskRef.current) return;

    const key = event.key;

    if (key === "Backspace") return;

    if (key === "Enter") {
      let { value } = inputTaskRef.current;
      setEnteredTextState(inputTaskRef.current.value);
      inputTaskRef.current.value = "";
      setCountLeftInputState(maxInputCount);

      if (!value || value.length > maxInputCount) {
        return;
      }
    }

    if (key === "Escape") {
      inputTaskRef.current.value = "";
      setCountLeftInputState(maxInputCount);
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
    />
  );
}

interface ILeftTextCounterProps {
  leftTextCount: number;
}

function LeftTextCounter(props: ILeftTextCounterProps): JSX.Element {
  return <div className={styles.left_counter}>{props.leftTextCount}</div>;
}
