import styles from "./Task-style";

interface TaskElementProps {
  id: String;
  text: String;
  date: String;
}

export default (props: TaskElementProps): JSX.Element => {
  return (
    <div className="task" style={styles.task}>
      <input
        className="task__check"
        type="checkbox"
        style={styles.task__check}
      ></input>
      <div className="task__text" style={styles.task__text}>
        {props.text}
      </div>
      <div className="task__date" style={styles.task__date}>
        {props.date}
      </div>
      <button className="task__delete" style={styles.task__delete}>
        delete
      </button>
    </div>
  );
};
