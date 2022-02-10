import { ITaskBody } from "../../api/taskAPI/taskAPIInterfaces";

export interface ITaskListState {
  viewTaskPage: ITaskBody[];
  status: "idle" | "loading" | "failed";
}

export interface IChangeTaskPayload {
  id: string;
  text: string;
}
