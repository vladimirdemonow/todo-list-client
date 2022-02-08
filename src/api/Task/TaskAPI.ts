const axios = require("axios");

interface IPostTaskRequest {
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IPostTaskResponse {
  readonly data: IPostTaskResponseData;
  readonly status: number;
  readonly statusText: "OK" | string;
}

interface IPostTaskResponseData {
  createdAt: string;
  done: boolean;
  name: string;
  updatedAt: string;
  userId: string;
  uuid: string;
}

export async function postTaskRequest(body: IPostTaskRequest) {
  let result: IPostTaskResponseData | null = null;

  await axios
    .post(process.env.TODO_LIST_API + "/task/5", body)
    .then(function ({ data, status, statusText }: IPostTaskResponse) {
      // handle success
      result = data;
    })
    .catch(function (error: any) {
      // handle error
      console.log(error.message);
    })
    .then(function () {
      // always executed
    });

  console.log("result", result);
  return result;
}

export async function getTasksRequest() {
  await axios
    .get("https://todo-api-learning.herokuapp.com/v1/tasks/5")
    .then(function (response: any) {
      // handle success
      console.log(response);
    })
    .catch(function (error: any) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
