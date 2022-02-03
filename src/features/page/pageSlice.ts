import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IPageState {
  pagePoint: number;
  pageCount: number;
  pageViewStart: number;
  pageViewEnd: number;
}

const initialState: IPageState = {
  pagePoint: 1,
  pageCount: 1,
  pageViewStart: 0,
  pageViewEnd: 0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPagePoint: (state, action: PayloadAction<number>) => {
      state.pagePoint = action.payload;
    },
    incrementPagePoint: (state) => {
      if (state.pagePoint === state.pageCount) {
        return;
      }

      state.pagePoint += 1;

      if (state.pageViewEnd < state.pagePoint) {
        state.pageViewStart++;
        state.pageViewEnd++;
      }
    },
    decrementPagePoint: (state) => {
      if (state.pagePoint === 1) {
        return;
      }

      state.pagePoint -= 1;

      if (state.pageViewStart > state.pagePoint) {
        state.pageViewStart--;
        state.pageViewEnd--;
      }
    },
    setPagePointStart: (state) => {
      state.pagePoint = 1;

      if (state.pagePoint < state.pageViewStart) {
        state.pageViewStart = 1;
        state.pageViewEnd = 5;
      }
    },
    setPagePointEnd: (state) => {
      state.pagePoint = state.pageCount;

      if (state.pagePoint > state.pageViewEnd) {
        state.pageViewStart = state.pageCount - 4;
        state.pageViewEnd = state.pageCount;
      }
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;

      if (state.pageCount < state.pagePoint) {
        state.pagePoint = 1;
      }

      if (state.pageCount > 5) {
        if (state.pagePoint > 2 && state.pagePoint < state.pageCount - 1) {
          state.pageViewStart = state.pagePoint - 2;
          state.pageViewEnd = state.pagePoint + 2;
          return;
        }

        if (state.pagePoint <= 2) {
          state.pageViewStart = 1;
          state.pageViewEnd = 5;
          return;
        }

        if (state.pagePoint >= state.pageCount - 1) {
          state.pageViewStart = state.pageCount - 4;
          state.pageViewEnd = state.pageCount;
          return;
        }
      }

      if (state.pageCount <= 5) {
        state.pageViewStart = 1;
        state.pageViewEnd = state.pageCount;
      }
    },
  },
});

export const {
  setPagePoint,
  setPageCount,
  incrementPagePoint,
  decrementPagePoint,
  setPagePointStart,
  setPagePointEnd,
} = pageSlice.actions;

export const selectPagePoint = (state: RootState) => state.page.pagePoint;
export const selectPageCount = (state: RootState) => state.page.pageCount;
export const selectPageViewStart = (state: RootState) =>
  state.page.pageViewStart;
export const selectPageViewEnd = (state: RootState) => state.page.pageViewEnd;

export default pageSlice.reducer;
