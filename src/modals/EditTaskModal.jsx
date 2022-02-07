import { useRef } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCurrentTaskID,
  setAbsoluteModal,
} from "../features/slices/modalSlice";
import { changeTask, selectTaskList } from "../features/slices/taskListSlice";

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
  const inputRef = useRef();

  function afterOpenModal() {
    inputRef.current.value = taskListSelector.find(
      (element) => element.id === currentTaskID
    ).text;
  }

  function closeModal(causeClose) {
    if (causeClose === "Enter") {
      dispatch(changeTask({ text: inputRef.current.value, id: currentTaskID }));
    }
    dispatch(setAbsoluteModal());
  }

  return (
    <div>
      <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false} // For stop log errors of this modal
      >
        <input
          autoFocus
          ref={inputRef}
          className={styles.edit_task__modal}
          onKeyPressCapture={(e) => {
            if (e.key === "Escape" || e.key === "Enter") closeModal(e.key);
          }}
        />
      </Modal>
    </div>
  );
}
