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

export interface IChangeTaskPayload {
  id: string;
  text: string;
}

const initialState: ITaskListState = {
  tasks: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.unshift(action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.tasks.find((element, index, array) => {
        if (element.id === action.payload) array[index].isCompleted = true;
      });
    },
    uncompleteTask: (state, action: PayloadAction<string>) => {
      state.tasks.find((element, index, array) => {
        if (element.id === action.payload) array[index].isCompleted = false;
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((element) => {
        return element.id === action.payload ? false : true;
      });
    },
    changeTask: (state, action: PayloadAction<IChangeTaskPayload>) => {
      state.tasks = state.tasks.map((element) => {
        if (element.id === action.payload.id) {
          element.text = action.payload.text;
        }
        return element;
      });
    },
  },
});

export const {
  createTask,
  completeTask,
  uncompleteTask,
  deleteTask,
  changeTask,
} = taskListSlice.actions;

export const selectTaskList = (state: RootState) => state.taskList.tasks;

export default taskListSlice.reducer;
