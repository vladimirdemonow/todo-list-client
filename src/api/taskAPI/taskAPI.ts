import {
  IAxiosResponseTaskBody,
  IAxiosResponseTaskListBody,
  IAxiosTaskRequest,
  IErrorResponse,
  ITaskBody,
  ITaskListQueryParams,
} from "./taskAPIInterfaces";

const axios = require("axios");

const url = process.env.REACT_APP_TODO_LIST_API;
const userId = process.env.REACT_APP_USER_ID;
const endPoint = "/task/";

export const axiosTaskRequest = async ({ method, data }: IAxiosTaskRequest) => {
  const uuid =
    method === "patch" || method === "delete" ? "/" + data?.uuid : "";

  return axios({
    method,
    url: `${url}${endPoint}${userId}${uuid}`,
    data,
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
};

// GET TASK LIST

export const axiosGetTaskListRequest = async (
  params: ITaskListQueryParams
): Promise<IAxiosResponseTaskListBody> => {
  return axios({
    method: "get",
    url: `${url}/tasks/${userId}`,
    params,
  }).catch(({ response }: IErrorResponse) => console.log(response.status));
};
