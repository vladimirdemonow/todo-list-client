import React, { Dispatch, useEffect, useRef, useState } from "react";
import styles from "./InputTaskComponent.module.scss";
import dayjs from "dayjs";

import { useAppDispatch } from "../../app/hooks";
import { createTask } from "../../features/slices/taskListSlice";
import InputTaskController, {
  IEnteredTextState,
} from "../../features/controllers/InputTaskController";
import { AnyAction } from "@reduxjs/toolkit";

const maxInputCount = 100;

const initialState: IEnteredTextState = { text: "", escaped: false };
export default (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [enteredTextState, setEnteredTextState] = useState(initialState);

  const inputTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (enteredTextState.text !== "")
      onEnterTask({ dispatch, enteredTextState: enteredTextState.text });
    setEnteredTextState(initialState);
  }, [enteredTextState]);

  return (
    <div className={styles.form__group}>
      <InputTaskController
        inputType="create_task"
        inputTaskRef={inputTaskRef}
        setEnteredTextState={setEnteredTextState}
        styleLeftCount={styles.left_counter}
      />
    </div>
  );
};

export interface IEnterTaskProps {
  dispatch: Dispatch<AnyAction>;
  enteredTextState: string;
}

function onEnterTask({ dispatch, enteredTextState: value }: IEnterTaskProps) {
  dayjs(new Date());
  const time = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  dispatch(
    createTask({
      name: value,
      createdAt: time,
      updatedAt: time,
      done: false,
    })
  );
}
