import styles from "./TaskStyle";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface TaskElementProps {
  key: String;
  text: String;
  date: String;
}

export default (props: TaskElementProps): JSX.Element => {
  return (
    <div className="task" style={styles.task}>
      <AiOutlineCheckCircle size={30}>
        <input
          className="task__check"
          type="checkbox"
          style={styles.task__check}
        ></input>
      </AiOutlineCheckCircle>
      <div className="task__text" style={styles.task__text}>
        {props.text}
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
