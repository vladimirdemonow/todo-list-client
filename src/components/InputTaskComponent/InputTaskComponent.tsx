import React, { Dispatch, useEffect, useRef, useState } from "react";
import styles from "./InputTaskComponent.module.scss";
import { v4 } from "uuid";

import { useAppDispatch } from "../../app/hooks";
import { createTask, ITask } from "../../features/slices/taskListSlice";
import InputTaskController from "../../features/controllers/InputTaskController";
import { ActionCreatorWithPayload, AnyAction } from "@reduxjs/toolkit";

const maxInputCount = 100;

export default (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [countLeftInputState, setCountLeftInputState] = useState(maxInputCount);
  const [enteredTextState, setEnteredTextState] = useState("");

  const inputTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (enteredTextState !== "") onEnterTask({ dispatch, enteredTextState });
    setEnteredTextState("");
  }, [enteredTextState]);

  return (
    <div className={styles.form__group}>
      <InputTaskController
        inputType="create_task"
        setCountLeftInputState={setCountLeftInputState}
        countLeftInputState={countLeftInputState}
        inputTaskRef={inputTaskRef}
        setEnteredTextState={setEnteredTextState}
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
