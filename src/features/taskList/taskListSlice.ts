import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ITask {
  id: string;
  text: String;
  date: String;
  isCompleted: boolean;
  timeStamp: number;
}

export interface ITaskListState {
  tasks: Array<ITask>;
}

const initialState: ITaskListState = {
  tasks: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.tasks.find((element, index, array) => {
        if (element.id === action.payload) {
          array[index].isCompleted = true;
        }
      });
    },
    uncompleteTask: (state, action: PayloadAction<string>) => {
      state.tasks.find((element, index, array) => {
        if (element.id === action.payload) {
          array[index].isCompleted = false;
        }
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((element) => {
        return element.id === action.payload ? false : true;
      });
    },
  },
});

export const { createTask, completeTask, uncompleteTask, deleteTask } =
  taskListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTaskList = (state: RootState) => state.taskList.tasks;

export default taskListSlice.reducer;
