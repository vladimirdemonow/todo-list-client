import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList } from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  const taskListSelector = useAppSelector(selectTaskList);
  console.log(taskListSelector);

  return (
    <div className={styles.task_list}>
      {taskListSelector?.map((element, index) => (
        <TaskComponent
          key={element.id}
          text={element.text}
          date={element.date}
        ></TaskComponent>
      ))}
    </div>
  );
};
