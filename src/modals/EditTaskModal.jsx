import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCurrentTaskID, setAbsoluteModal } from "../features/slices/modalSlice";
import { changeTask, selectTaskList } from "../features/slices/taskListSlice";





import styles from './EditTaskModal.module.scss'


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
  let subtitle;

  const dispatch = useAppDispatch()
  const currentTaskID = useAppSelector(selectCurrentTaskID)
  const inputRef = useRef()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
  }

  function closeModal(causeClose) {

    if(causeClose !== 'Enter') {
      setIsOpen(false);
      dispatch(setAbsoluteModal())
      return
    }

    dispatch(changeTask({text: inputRef.current.value, id: currentTaskID }))

    setIsOpen(false);
    dispatch(setAbsoluteModal())

  }

  return (
    <div>
      <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        >
        <input autoFocus ref={inputRef} className={styles.edit_task__modal} onKeyPressCapture={(e) => {
          if(e.key === 'Escape' || e.key === 'Enter') closeModal(e.key)
      }} />
      </Modal>
    </div>
  );
}
