import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskListSlice from "../features/taskList/taskListSlice";
import orderReducer from "../features/order/orderSlice";
import pageReducer from "./../features/page/pageSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListSlice,
    order: orderReducer,
    page: pageReducer,
    modal: modalReducer,
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
