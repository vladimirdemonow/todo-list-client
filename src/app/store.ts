import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskListSlice from "../features/slices/taskListSlice";
// import orderReducer from "../features/slices/orderSlice";
// import pageReducer from "../features/slices/pageSlice";
// import modalReducer from "../features/slices/modalSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListSlice,
    // order: orderReducer,
    // page: pageReducer,
    // modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
