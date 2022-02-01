import styles from "./TaskComponent.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface TaskElementProps {
  key: String;
  text: String;
  date: String;
}

export default (props: TaskElementProps): JSX.Element => {
  let dividedText = props.text;
  const taskTextArray = [];

  while (dividedText.length > 40) {
    taskTextArray.push(<div> {dividedText.slice(0, 35)} </div>);
    dividedText = dividedText.slice(35, dividedText.length - 1);
  }

  taskTextArray.push(<div>{dividedText}</div>);

  return (
    <div className={styles.task}>
      <AiOutlineCheckCircle size={30}>
        <input className={styles.task__check} type="checkbox"></input>
      </AiOutlineCheckCircle>
      <div className={styles.task__text}>{taskTextArray}</div>
      <div className={styles.task__date}>{props.date}</div>
      <AiFillDelete size={30}>
        <button className={styles.task__delete}>delete</button>
      </AiFillDelete>
    </div>
  );
};
