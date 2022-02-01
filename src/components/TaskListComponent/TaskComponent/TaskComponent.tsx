import styles from "./TaskStyle";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import borderStyle from "./TaskStyleBorder.module.scss";

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
    <div className={borderStyle.border} style={styles.task}>
      <AiOutlineCheckCircle size={30}>
        <input
          className="task__check"
          type="checkbox"
          style={styles.task__check}
        ></input>
      </AiOutlineCheckCircle>
      <div className="task__text" style={styles.task__text}>
        {taskTextArray}
      </div>
      <div className="task__date" style={styles.task__date}>
        {props.date}
      </div>
      <AiFillDelete size={30}>
        <button className="task__delete" style={styles.task__delete}>
          delete
        </button>
      </AiFillDelete>
    </div>
  );
};
