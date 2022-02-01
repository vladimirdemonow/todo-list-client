import styles from "./TaskListStyle";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList } from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  const taskListSelector = useAppSelector(selectTaskList);
  console.log(taskListSelector);

  return (
    <div className="task_list" style={styles.task_list}>
      {taskListSelector?.map((element, index) => (
        <TaskComponent
          key={element.date.toString() + index}
          text={element.text}
          date={element.date}
        ></TaskComponent>
      ))}
    </div>
  );
};
