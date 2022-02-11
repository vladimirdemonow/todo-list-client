export interface ITaskBody {
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  done: boolean;
}

// RESPONSE

export interface IAxiosResponseTaskBody {
  readonly data: ITaskBody;
  readonly status: number;
}

// TASK LIST BODY
export interface IAxiosResponseTaskListBody {
  readonly data: ITaskListResponseBody;
  readonly status: number;
}

export interface ITaskListResponseBody {
  count: number;
  tasks: ITaskBody[];
}

// PARAMS

export interface ITaskListQueryParams {
  filterBy?: "done" | "undone" | null | "";
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

// TASK REQUEST

export type TMethod = "post" | "patch" | "delete";
export type TRequestBody = ITaskBody | undefined;

export interface IAxiosTaskRequest {
  method: TMethod;
  data: TRequestBody;
}
