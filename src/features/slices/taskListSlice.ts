import {
  ITaskBody,
  ITaskListQueryParams,
} from "./../../api/taskAPI/taskAPIInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  axiosDeleteTaskRequest,
  axiosGetTaskListRequest,
  axiosPatchTaskRequest,
  axiosPostTaskRequest,
} from "../../api/taskAPI/taskAPI";
import { RootState } from "../../app/store";
import { ITaskListState } from "./taskListInterface";

const initialState: ITaskListState = {
  viewTaskPage: [],
  status: "idle",
  filterBy: "all",
  order: "asc",
  page: 1,
  count: 0,
};

export const postTaskAsync = createAsyncThunk(
  "taskList/postTask",
  async (task: ITaskBody) => {
    const response = await axiosPostTaskRequest(task);

    return response.data;
  }
);

export const patchTaskAsync = createAsyncThunk(
  "taskList/patchTask",
  async (task: ITaskBody) => {
    const response = await axiosPatchTaskRequest(task);

    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "taskList/deleteTask",
  async ({ uuid }: ITaskBody) => {
    if (!uuid) return;
    await axiosDeleteTaskRequest(uuid);
    return;
  }
);

export const getTaskListAsync = createAsyncThunk(
  "taskList/getTaskList",
  async (params: ITaskListQueryParams) => {
    const response = await axiosGetTaskListRequest(params);

    return response.data.tasks;
  }
);

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(postTaskAsync.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(patchTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(patchTaskAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      })
      .addCase(patchTaskAsync.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      })
      .addCase(deleteTaskAsync.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(getTaskListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTaskListAsync.fulfilled, (state, action) => {
        console.log(action.payload);

        state.viewTaskPage = action.payload;
        state.status = "idle";
      })
      .addCase(getTaskListAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = taskListSlice.actions;

export const selectViewTaskPage = (state: RootState) =>
  state.taskList.viewTaskPage;

export const selectStatus = (state: RootState) => state.taskList.status;

export const selectFilterBy = (state: RootState) => state.taskList.filterBy;
export const selectOrder = (state: RootState) => state.taskList.order;

export default taskListSlice.reducer;
