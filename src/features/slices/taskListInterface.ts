import { ITaskListQueryParams } from "./../../api/taskAPI/taskAPIInterfaces";
import { ITaskBody } from "../../api/taskAPI/taskAPIInterfaces";

interface IStatus {
  getTaskListRequestStatus: "idle" | "loading" | "failed";
  taskRequestStatus: "idle" | "loading" | "failed";
}

export interface ITaskListState {
  viewTaskPage: ITaskBody[];
  status: IStatus;
  params: ITaskListQueryParams;
  isToUpdateTaskPage: boolean;
}
