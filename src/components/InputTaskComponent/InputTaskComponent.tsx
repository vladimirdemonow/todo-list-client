import React, { useEffect, useRef, useState } from "react";
import styles from "./InputTaskComponent.module.scss";
import { v4 } from "uuid";

import { useAppDispatch } from "../../app/hooks";
import { createTask } from "../../features/slices/taskListSlice";

const maxInputCount = 100;

export default (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [countLeftInputs, setCountLeftInputs] = useState(maxInputCount);

  const inputTaskRef: any = useRef(null); // any, because inputTaskRef.current.value - Property 'value' does not exist on type 'never'

  const onInputTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (key === "Backspace") return;

    if (key === "Enter") {
      let { value } = inputTaskRef.current;
      inputTaskRef.current.value = "";
      setCountLeftInputs(maxInputCount);

      if (!value || value.length > maxInputCount) {
        return;
      }

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

      return;
    }

    if (key === "Escape") {
      inputTaskRef.current.value = "";
      setCountLeftInputs(maxInputCount);
    }

    if (inputTaskRef.current.value.length >= maxInputCount) {
      event.preventDefault();
      return;
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountLeftInputs(maxInputCount - inputTaskRef.current.value.length);
  };

  return (
    <div className={styles.form__group}>
      <input
        type="input"
        ref={inputTaskRef}
        onKeyDownCapture={onInputTask}
        onChange={onChangeInput}
        className={styles.form__field}
        placeholder="new task"
        name="name"
        id="name"
      />
      {countLeftInputs < maxInputCount ? (
        <div className={styles.left_counter}>{countLeftInputs}</div>
      ) : (
        <></>
      )}
    </div>
  );
};
