import {
  ITaskListQueryParams,
  TMethod,
  TRequestBody,
} from "./../../api/taskAPI/taskAPIInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  axiosGetTaskListRequest,
  axiosTaskRequest,
} from "../../api/taskAPI/taskAPI";
import { RootState } from "../../app/store";
import { ITaskListState } from "./taskListInterface";

const initialState: ITaskListState = {
  viewTaskPage: [],
  status: {
    getTaskListRequestStatus: "idle",
    taskRequestStatus: "idle",
  },
  params: {
    filterBy: null,
    order: "asc",
    pp: 5,
    page: 1,
  },
  isToUpdateTaskPage: false,
};

interface IAxiosTaskThunk {
  method: TMethod;
  data: TRequestBody;
}

export const axiosTaskThunk = createAsyncThunk(
  "taskList/Task",
  async ({ method, data }: IAxiosTaskThunk) => {
    await axiosTaskRequest({ method, data });
    return;
  }
);

export const axiosGetTaskListThunk = createAsyncThunk(
  "taskList/GetTaskList",
  async (params: ITaskListQueryParams) => {
    const response = await axiosGetTaskListRequest(params);
    return response.data;
  }
);

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosTaskThunk.pending, (state) => {
        state.status.taskRequestStatus = "loading";
      })
      .addCase(axiosTaskThunk.fulfilled, (state) => {
        state.status.taskRequestStatus = "idle";
        state.isToUpdateTaskPage = true;
      })
      .addCase(axiosTaskThunk.rejected, (state) => {
        state.status.taskRequestStatus = "failed";
      });
    builder
      .addCase(axiosGetTaskListThunk.pending, (state) => {
        state.status.getTaskListRequestStatus = "loading";
      })
      .addCase(axiosGetTaskListThunk.fulfilled, (state, action) => {
        console.log(action.payload.tasks);

        state.viewTaskPage = action.payload.tasks;
        state.isToUpdateTaskPage = false;
        state.status.getTaskListRequestStatus = "idle";
      })
      .addCase(axiosGetTaskListThunk.rejected, (state) => {
        state.status.getTaskListRequestStatus = "failed";
      });
  },
});

export const selectViewTaskPage = (state: RootState) =>
  state.taskList.viewTaskPage;

export const selectStatus = (state: RootState) => state.taskList.status;

export const selectParams = (state: RootState) => state.taskList.params;
export const selectIsToUpdateTaskPage = (state: RootState) =>
  state.taskList.isToUpdateTaskPage;

export default taskListSlice.reducer;
