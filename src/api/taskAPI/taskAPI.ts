const axios = require("axios");

export let url_taskEndPoint =
  "" +
  process.env.REACT_APP_TODO_LIST_API +
  "/" +
  process.env.REACT_APP_ENDPOINT_TASK +
  "/" +
  process.env.REACT_APP_JUNIOR_POSITION;

export let url_tasksEndPoint =
  "" +
  process.env.REACT_APP_TODO_LIST_API +
  "/" +
  process.env.REACT_APP_ENDPOINT_TASKS +
  "/" +
  process.env.REACT_APP_JUNIOR_POSITION;

export interface ITaskRequestBody {
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskResponse {
  readonly data: ITaskResponseData;
  readonly status: number;
  readonly statusText: "OK" | string;
}

export interface ITaskResponseData {
  name: string;
  done: boolean;
  userId?: string;
  uuid?: string;
  createdAt: string;
  updatedAt: string;
}

export async function postTaskRequest(body: ITaskRequestBody) {
  let result: ITaskResponseData | undefined;

  await axios
    .post(url_taskEndPoint, body)
    .then((response: ITaskResponse) => (result = response.data))
    .catch(function (error: any) {
      console.log("--post ", error.message);
    });

  return result;
}

export async function patchTaskRequest(uuid: string, body: ITaskRequestBody) {
  return await axios
    .patch(url_taskEndPoint + "/" + uuid, body)
    .then((response: ITaskResponse) => response)
    .catch(function (error: any) {
      console.log("--path ", error.message);
    });
}

export async function deleteTaskRequest(uuid: string) {
  return await axios
    .delete(url_taskEndPoint + "/" + uuid)
    .then((response: ITaskResponse) => response.statusText)
    .catch(function (error: any) {
      console.log("--delete ", error.message);
    });
}

export async function getTaskListRequest() {
  let result: ITaskResponseData | undefined | any;

  await axios
    .get(url_tasksEndPoint)
    .then((response: ITaskResponse) => (result = response.data))
    .catch(function (error: any) {
      console.log("--get-all", error.message);
    });

  return result;
}
