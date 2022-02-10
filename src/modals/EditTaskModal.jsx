import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputTaskController from "../features/controllers/InputTaskController";
import {
  selectCurrentTaskID,
  setAbsoluteModal,
} from "../features/slices/modalSlice";
import { updateTask, selectTaskList } from "../features/slices/taskListSlice";

import styles from "./EditTaskModal.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function EditTaskModal() {
  const dispatch = useAppDispatch();
  const currentTaskID = useAppSelector(selectCurrentTaskID);
  const taskListSelector = useAppSelector(selectTaskList);
  const inputTaskRef = useRef();

  const initialState = { text: "", escaped: false };
  const [enteredTextState, setEnteredTextState] = useState(initialState);

  useEffect(() => {
    if (enteredTextState.text === "") return;
    if (enteredTextState.escaped) {
      dispatch(setAbsoluteModal());
      return;
    } else {
      dispatch(updateTask({ text: enteredTextState.text, id: currentTaskID }));
      dispatch(setAbsoluteModal());
      return;
    }
  }, [enteredTextState]);

  return (
    <div>
      <Modal
        isOpen={true}
        style={customStyles}
        ariaHideApp={false} // For stop log errors of this modal
      >
        <InputTaskController
          inputType="edit_task"
          inputTaskRef={inputTaskRef}
          setEnteredTextState={setEnteredTextState}
          styleLeftCount={styles.left_counter}
          defaultText={
            taskListSelector.find((element) => element.uuid === currentTaskID)
              .name
          }
        />
      </Modal>
    </div>
  );
}
