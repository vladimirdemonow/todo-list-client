import styles from "./TaskComponent.module.scss";
import {
  AiFillDelete,
  AiOutlineBorder,
  AiOutlineDownSquare,
} from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  completeTask,
  uncompleteTask,
  deleteTask,
} from "../../../features/slices/taskListSlice";
import { useEffect, useState } from "react";
import EditTaskModal from "../../../modals/EditTaskModal";
import {
  selectModalState,
  setEditTaskModal,
} from "../../../features/slices/modalSlice";

interface TaskElementProps {
  key: string;
  id: string;
  text: String;
  date: String;
  isCompleted: boolean;
}

export default (props: TaskElementProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector(selectModalState);
  const [isShowEditTaskModal, setShowEditTaskModal] = useState(false);

  const taskTextArray = createDividedString(props.text);

  const activeColor = props.isCompleted ? " " + styles.task__completed : " ";

  useEffect(() => {
    setShowEditTaskModal(modalSelector === "edit-task");
  }, [modalSelector]);

  return !isShowEditTaskModal ? (
    <div
      className={styles.task + activeColor}
      onClick={(e: any) => {
        if (e.target.nodeName === "path" || e.target.nodeName === "svg") return;

        dispatch(setEditTaskModal(props.id));
      }}
    >
      {createCheckButton(props.isCompleted, dispatch, props.id)}
      <div className={styles.task__text}>{taskTextArray}</div>
      <div className={styles.task__date}>{props.date}</div>
      <AiFillDelete
        size={30}
        onClick={() => {
          dispatch(deleteTask(props.id));
        }}
      />
    </div>
  ) : (
    <EditTaskModal />
  );
};

function createCheckButton(
  isCompleted: boolean,
  dispatch: any,
  id: string
): JSX.Element {
  let Element = isCompleted ? AiOutlineDownSquare : AiOutlineBorder;

  return (
    <Element
      size={30}
      onClick={() =>
        dispatch(isCompleted ? uncompleteTask(id) : completeTask(id))
      }
    />
  );
}

function createDividedString(text: String): Array<JSX.Element> {
  const taskTextArray = [];

  while (text.length > 40) {
    taskTextArray.push(<div> {text.slice(0, 35)} </div>);
    text = text.slice(35, text.length - 1);
  }

  taskTextArray.push(<div>{text}</div>);
  return taskTextArray;
}
