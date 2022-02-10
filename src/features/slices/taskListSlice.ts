import { ITaskBody } from "./../../api/taskAPI/taskAPIInterfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  axiosGetTaskListRequest,
  axiosPostTaskRequest,
} from "../../api/taskAPI/taskAPI";
import { RootState } from "../../app/store";
import { ITaskListState } from "./taskListInterface";

const initialState: ITaskListState = {
  viewTaskPage: [],
  status: "idle",
};

export const postTaskAsync = createAsyncThunk(
  "taskList/postTask",
  async (task: ITaskBody) => {
    const response = await axiosPostTaskRequest(task);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getTaskListAsync = createAsyncThunk(
  "taskList/getTaskList",
  async () => {
    const response = await axiosGetTaskListRequest({ pp: 5 });
    console.log(1);

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
        console.log("loading");
        state.status = "loading";
      })
      .addCase(getTaskListAsync.fulfilled, (state, action) => {
        console.log("idle");
        state.status = "idle";
        state.viewTaskPage = action.payload;
      })
      .addCase(getTaskListAsync.rejected, (state) => {
        console.log("fail");

        state.status = "failed";
      });
  },
});

export const {} = taskListSlice.actions;

export const selectViewTaskPage = (state: RootState) =>
  state.taskList.viewTaskPage;

export default taskListSlice.reducer;
