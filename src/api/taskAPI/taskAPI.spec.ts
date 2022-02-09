import {
  postTaskRequest,
  ITaskRequestBody,
  ITaskResponse,
  ITaskResponseData,
  url_taskEndPoint,
  url_tasksEndPoint,
  getTaskListRequest,
  deleteTaskRequest,
  patchTaskRequest,
} from "./taskAPI";

const ignoreList = {
  post: true,
  get: false,
  path: true,
  delete: false,
};

describe("API Task Test", () => {
  const taskRandomText = "text " + Date.now();

  const taskRequestBody: ITaskRequestBody = {
    name: taskRandomText,
    done: true,
    createdAt: "123",
    updatedAt: "321",
  };

  const anotherTaskRequestBody: ITaskRequestBody = {
    name: "omg",
    done: true,
    createdAt: "123",
    updatedAt: "321",
  };

  it("postTaskRequest", () => {
    expect.assertions(1);
    return postTaskRequest(taskRequestBody).then((result) => {
      expect(result?.name).toEqual(taskRequestBody.name);
    });
  });

  it("getTaskListRequest", () => {
    expect.assertions(1);
    return getTaskListRequest().then((data) => {
      expect(data).toEqual(0);
    });
  });

  it("patchTaskRequest", () => {
    expect.assertions(1);

    const uuid = "a3971900-9452-4da2-a881-818e50ad7fe0";

    return patchTaskRequest(uuid, anotherTaskRequestBody).then((result) => {
      expect(result).toEqual("path");
    });
  });

  it("deleteTaskRequest", () => {
    expect.assertions(1);

    const uuid = "a3971900-9452-4da2-a881-818e50ad7fe0";

    return deleteTaskRequest(uuid).then((result) => {
      expect(result).toEqual("No Content");
    });
  });
});

describe("Check URL", () => {
  it("url task Endpoint: is https://todo-api-learning.herokuapp.com/v1/task/5", () => {
    expect(url_taskEndPoint).toEqual(
      "https://todo-api-learning.herokuapp.com/v1/task/5"
    );
  });

  it("url tasks Endpoint: is https://todo-api-learning.herokuapp.com/v1/tasks/5", () => {
    expect(url_tasksEndPoint).toEqual(
      "https://todo-api-learning.herokuapp.com/v1/tasks/5"
    );
  });
});
