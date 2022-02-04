import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type TModal = "absolute" | "edit-task";

export interface IModal {
  modal: TModal;
}

const initialState: IModal = {
  modal: "absolute",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<TModal>) => {
      state.modal = action.payload;
    },
  },
});

export const { setModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.modal;

export default modalSlice.reducer;
