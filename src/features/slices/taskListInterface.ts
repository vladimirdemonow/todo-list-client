export interface ITask {
  uuid?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  done: boolean;
}

export interface ITaskListState {
  tasks: ITask[];
  status: "idle" | "loading" | "failed";
}

export interface IChangeTaskPayload {
  id: string;
  text: string;
}
