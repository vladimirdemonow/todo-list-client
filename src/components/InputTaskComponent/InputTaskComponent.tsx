import { useRef } from "react";
import styles from "./InputTaskComponent.module.scss";
import { v4 } from "uuid";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createTask,
  selectTaskList,
} from "../../features/counter/counterSlice";

interface IInputKey {
  key: string;
}

export default (): JSX.Element => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectTaskList);

  const inputTaskRef: any = useRef(null); // any, because inputTaskRef.current.value - Property 'value' does not exist on type 'never'

  const onInputTask = ({ key }: IInputKey) => {
    if (key === "Enter") {
      let { value } = inputTaskRef.current;

      if (value) {
        inputTaskRef.current.value = "";

        const [day, month, number, year, time] = Date()
          .toString()
          .trim()
          .split(" ");

        dispatch(
          createTask({
            id: v4(),
            text: value,
            date: `${time} | ${number} ${month} ${year}`,
          })
        );
      }
    }
    if (key === "Escape") {
      inputTaskRef.current.value = "";
    }
  };

  return (
    <div className={styles.form__group}>
      <input
        type="input"
        ref={inputTaskRef}
        onKeyDownCapture={onInputTask}
        className={styles.form__field}
        name="name"
        id="name"
      />
    </div>
  );
};
