import { useRef } from "react";
import styles from "./InputTaskComponent.module.scss";
import { v4 } from "uuid";

import { useAppDispatch } from "../../app/hooks";
import { createTask } from "../../features/taskList/taskListSlice";

interface IInputKey {
  key: string;
}

export default (): JSX.Element => {
  const dispatch = useAppDispatch();

  const inputTaskRef: any = useRef(null); // any, because inputTaskRef.current.value - Property 'value' does not exist on type 'never'

  const onInputTask = ({ key }: IInputKey) => {
    if (key === "Enter") {
      let { value } = inputTaskRef.current;

      if (value) {
        inputTaskRef.current.value = "";

        const [, month, number, year, time] = Date()
          .toString()
          .trim()
          .split(" ");

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
