import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type TModal = "absolute" | "edit-task";

export interface IModal {
  modalState: TModal;
  currentTaskID: string;
}

const initialState: IModal = {
  modalState: "absolute",
  currentTaskID: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAbsoluteModal: (state) => {
      state.modalState = "absolute";
    },
    setEditTaskModal: (state, action: PayloadAction<string>) => {
      state.currentTaskID = action.payload;
      state.modalState = "edit-task";
    },
  },
});

export const { setAbsoluteModal, setEditTaskModal } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal.modalState;
export const selectCurrentTaskID = (state: RootState) =>
  state.modal.currentTaskID;

export default modalSlice.reducer;
