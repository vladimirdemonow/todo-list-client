import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ITask {
  id: string;
  text: String;
  date: String;
  isCompleted: boolean;
  timeStamp: number;
}

export interface ICounterState {
  taskList: Array<ITask>;
  pagePoint: number;
  pageCount: number;
  currentElementsCount: number;
}

const initialState: ICounterState = {
  taskList: [],
  pagePoint: 1,
  pageCount: 1,
  currentElementsCount: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.taskList.push(action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.taskList.find((element, index, array) => {
        if (element.id === action.payload) {
          array[index].isCompleted = true;
        }
      });
    },
    uncompleteTask: (state, action: PayloadAction<string>) => {
      state.taskList.find((element, index, array) => {
        if (element.id === action.payload) {
          array[index].isCompleted = false;
        }
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((element) => {
        return element.id === action.payload ? false : true;
      });
      state.currentElementsCount--;
    },
    setCurrentElementCount: (state, action: PayloadAction<number>) => {
      state.currentElementsCount = action.payload;
    },
    setPagePoint: (state, action: PayloadAction<number>) => {
      state.pagePoint = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
  },
});

export const {
  createTask,
  completeTask,
  uncompleteTask,
  deleteTask,
  setCurrentElementCount,
  setPagePoint,
  setPageCount,
} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTaskList = (state: RootState) => state.counter.taskList;
export const selectCurrentElementCount = (state: RootState) =>
  state.counter.currentElementsCount;
export const selectPage = (state: RootState) => state.counter.pagePoint;

export default counterSlice.reducer;
