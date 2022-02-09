import React, { Dispatch, useEffect, useRef, useState } from "react";
import styles from "./InputTaskComponent.module.scss";
import { v4 } from "uuid";

import { useAppDispatch } from "../../app/hooks";
import { createTask, ITask } from "../../features/slices/taskListSlice";
import InputTaskController, {
  IEnteredTextState,
} from "../../features/controllers/InputTaskController";
import { ActionCreatorWithPayload, AnyAction } from "@reduxjs/toolkit";
import { postTaskRequest } from "../../api/taskAPI/taskAPI";

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
  const [, month, number, year, time] = Date().toString().trim().split(" ");

  dispatch(
    createTask({
      id: v4(),
      text: value,
      date: `${time} | ${number} ${month} ${year}`,
      isCompleted: false,
      timeStamp: Date.now(),
    })
  );
}
