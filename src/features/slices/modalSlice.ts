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
    setModal: (state, action: PayloadAction<TModal>) => {
      state.modalState = action.payload;
    },
    setCurrentTask: (state, action: PayloadAction<string>) => {
      state.currentTaskID = action.payload;
    },
  },
});

export const { setModal, setCurrentTask } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal.modalState;
export const selectCurrentTask = (state: RootState) =>
  state.modal.currentTaskID;

export default modalSlice.reducer;
