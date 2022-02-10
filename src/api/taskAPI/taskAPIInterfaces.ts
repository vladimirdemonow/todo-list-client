// REQUEST

export interface ITaskRequestBody {
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

// RESPONSE

export interface IAxiosResponseTaskBody {
  readonly data: ITaskResponseBody;
  readonly status: number;
}

export interface ITaskResponseBody {
  name: string;
  done: boolean;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

// TASK LIST BODY
export interface IAxiosResponseTaskListBody {
  readonly data: ITaskListResponseBody;
  readonly status: number;
}

export interface ITaskListResponseBody {
  count: number;
  tasks: ITaskResponseBody[];
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
