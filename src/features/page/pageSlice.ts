import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IPageState {
  pagePoint: number;
  pageCount: number;
}

const initialState: IPageState = {
  pagePoint: 1,
  pageCount: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPagePoint: (state, action: PayloadAction<number>) => {
      state.pagePoint = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setPagePoint, setPageCount } = pageSlice.actions;

export const selectPagePoint = (state: RootState) => state.page.pagePoint;
export const selectPageCount = (state: RootState) => state.page.pageCount;

export default pageSlice.reducer;
