import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useAppDispatch } from "../app/hooks";
import { setModal } from "../features/modal/modalSlice";


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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
  }

  function closeModal() {
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
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
