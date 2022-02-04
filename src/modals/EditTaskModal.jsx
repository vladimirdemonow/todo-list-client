import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useAppDispatch } from "../app/hooks";
import { setModal } from "../features/modal/modalSlice";
import styles from './EditTaskModal.module.scss' // not work


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
  const inputRef = useRef()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
  }

  function closeModal(causeClose) {
    setIsOpen(false);
    dispatch(setModal('absolute'))
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
