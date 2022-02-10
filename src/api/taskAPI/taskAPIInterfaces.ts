import { ITask } from "./../../features/slices/taskListSlice";

// RESPONSE

export interface IAxiosResponseTaskBody {
  readonly data: ITask;
  readonly status: number;
}

// TASK LIST BODY
export interface IAxiosResponseTaskListBody {
  readonly data: ITaskListResponseBody;
  readonly status: number;
}

export interface ITaskListResponseBody {
  count: number;
  tasks: ITask[];
}

// PARAMS

export interface ITaskListQueryParams {
  filterBy?: "done" | "undone";
  order?: "asc" | "desk";
  pp?: 5 | 20;
  page?: number;
}

// ERRORS

type TErrorStatus = 400 | 422 | 404;
type TErrorData = {
  message: string;
};

export interface IErrorResponse {
  response: {
    status: TErrorStatus;
    data: TErrorData;
  };
}
