import styles from "./TaskComponent.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  completeTask,
  uncompleteTask,
} from "../../../features/counter/counterSlice";

interface TaskElementProps {
  key: string;
  id: string;
  text: String;
  date: String;
  isCompleted: boolean;
}

export default (props: TaskElementProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const taskTextArray = createDividedString(props.text);

  let activeColor = props.isCompleted ? " " + styles.task__completed : " ";

  return (
    <div className={styles.task + activeColor}>
      <AiOutlineCheckCircle
        size={30}
        onClick={() => {
          dispatch(
            !props.isCompleted
              ? completeTask(props.id)
              : uncompleteTask(props.id)
          );
          console.log(1);
        }}
      />
      <div className={styles.task__text}>{taskTextArray}</div>
      <div className={styles.task__date}>{props.date}</div>
      <AiFillDelete
        size={30}
        onClick={() => {
          dispatch(
            !props.isCompleted
              ? completeTask(props.id)
              : uncompleteTask(props.id)
          );
          console.log(1);
        }}
      />
    </div>
  );
};

function createDividedString(text: String): Array<JSX.Element> {
  const taskTextArray = [];

  while (text.length > 40) {
    taskTextArray.push(<div> {text.slice(0, 35)} </div>);
    text = text.slice(35, text.length - 1);
  }

  taskTextArray.push(<div>{text}</div>);
  return taskTextArray;
}
