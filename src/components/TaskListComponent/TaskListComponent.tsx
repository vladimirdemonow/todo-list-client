import styles from "./TaskListStyle";
import TaskComponent from "./TaskComponent/TaskComponent";

interface TaskListProps {
  list: Array<Task>;
}

interface Task {
  text: String;
  date: String;
}

export default (props: TaskListProps): JSX.Element => {
  return (
    <div className="task_list" style={styles.task_list}>
      {props.list.map((element, index) => (
        <TaskComponent
          key={element.date.toString() + index}
          text={element.text}
          date={element.date}
        ></TaskComponent>
      ))}
    </div>
  );
};
