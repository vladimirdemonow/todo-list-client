import { ITask } from "./../../features/slices/taskListSlice";
import {
  IAxiosResponseTaskBody,
  IAxiosResponseTaskListBody,
  IErrorResponse,
  ITaskListQueryParams,
} from "./taskAPIInterfaces";

const axios = require("axios");

const url = process.env.REACT_APP_TODO_LIST_API;
const userId = process.env.REACT_APP_USER_ID;
const endPoint = "/task/";

export async function axiosPostTaskRequest(
  requestBody: ITask
): Promise<IAxiosResponseTaskBody> {
  return axios({
    method: "post",
    url: `${url}${endPoint}${userId}`,
    data: requestBody,
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
}

export async function axiosPatchTaskRequest(
  uuid: string,
  requestBody: ITask
): Promise<IAxiosResponseTaskBody> {
  return axios({
    method: "patch",
    url: `${url}${endPoint}${userId}/${uuid}`,
    data: requestBody,
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
}

export async function axiosDeleteTaskRequest(uuid: string) {
  return axios({
    method: "delete",
    url: `${url}${endPoint}${userId}/${uuid}`,
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
}

export async function axiosGetTaskListRequest(
  queryParams: ITaskListQueryParams
): Promise<IAxiosResponseTaskListBody> {
  return axios({
    method: "get",
    url: `${url}/tasks/${userId}`,
    params: { ...queryParams },
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
}
