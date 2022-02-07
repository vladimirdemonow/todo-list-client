import { useRef, useState } from "react";
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

const maxInputCount = 100;

export default function EditTaskModal() {

  const dispatch = useAppDispatch()
  const currentTaskID = useAppSelector(selectCurrentTaskID)
  const taskListSelector = useAppSelector(selectTaskList)
  const inputTaskRef = useRef()

  const [countLeftInputs, setCountLeftInputs] = useState(maxInputCount);

  function afterOpenModal() {
    inputTaskRef.current.value = taskListSelector.find((element) => element.id === currentTaskID).text
  }

  function closeModal(causeClose) {

    if(inputTaskRef.current.value > maxInputCount - 1) return

    if(causeClose === 'Enter') {
      dispatch(changeTask({text: inputTaskRef.current.value, id: currentTaskID }))
    }

    dispatch(setAbsoluteModal())
  }

  

  const onChangeInput = (event) => {
    setCountLeftInputs(maxInputCount - inputTaskRef.current.value.length);

  };

  return (
    <div>
      <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false} // For stop log errors of this modal
        >
        <input autoFocus ref={inputTaskRef} className={styles.edit_task__modal} onKeyPressCapture={(e) => {
          if(e.key === 'Escape' || e.key === 'Enter') closeModal(e.key);
          if (e.key === "Backspace") return;

    if (inputTaskRef.current.value.length >= maxInputCount) {
      e.preventDefault();
      return;
    }
      }} onChange={onChangeInput} />

      
        { 
        (countLeftInputs < maxInputCount) ? 
        <div className={styles.left_counter}>{countLeftInputs}</div> : <></>
      }

      </Modal>
    </div>
  );
}
