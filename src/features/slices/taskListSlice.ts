import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  axiosGetTaskListRequest,
  axiosPostTaskRequest,
} from "../../api/taskAPI/taskAPI";
import { RootState } from "../../app/store";
import { ITask, ITaskListState } from "./taskListInterface";

const initialState: ITaskListState = {
  tasks: [],
  status: "idle",
};

export const postTaskAsync = createAsyncThunk(
  "taskList/postTask",
  async (task: ITask) => {
    const response = await axiosPostTaskRequest(task);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getTaskListAsync = createAsyncThunk(
  "taskList/getTaskList",
  async () => {
    const response = await axiosGetTaskListRequest({ pp: 5 });
    // The value we return becomes the `fulfilled` action payload
    return response.data.tasks;
  }
);

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTaskListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
      });
  },
});

export const {} = taskListSlice.actions;

export const selectTaskList = (state: RootState) => state.taskList.tasks;

export default taskListSlice.reducer;
