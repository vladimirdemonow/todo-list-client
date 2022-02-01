import { useRef } from "react";
import styles from "./InputTaskComponentStyle";
import inputsStyle from "./style-inputs.module.scss";

import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createTask } from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  const dispatch = useAppDispatch();

  const inputTaskRef: any = useRef(null); // any, because inputTaskRef.current.value - Property 'value' does not exist on type 'never'

  const onInputTask = (event: any) => {
    if (event.key === "Enter") {
      inputTaskRef.current.value = "";
      if (typeof inputTaskRef.current.value === "string") {
        dispatch(createTask(inputTaskRef.current.value));
      }
    }
  };

  return (
    <div className={inputsStyle.form__group} style={styles.input_task}>
      <input
        type="input"
        ref={inputTaskRef}
        onKeyPress={onInputTask}
        className={inputsStyle.form__field}
        placeholder="Name"
        name="name"
        id="name"
      />
    </div>
  );
};
