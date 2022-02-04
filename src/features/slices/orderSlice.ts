import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type TFilter = "all" | "done" | "undone";
export type TSort = "up" | "down" | "default";

export interface IOrderState {
  filter: TFilter;
  sort: TSort;
}

const initialState: IOrderState = {
  filter: "all",
  sort: "default",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
  },
});

export const { setFilter, setSort } = orderSlice.actions;

export const selectFilter = (state: RootState) => state.order.filter;
export const selectSort = (state: RootState) => state.order.sort;

export default orderSlice.reducer;
