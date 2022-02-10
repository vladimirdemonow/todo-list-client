import { ITaskBody } from "../../api/taskAPI/taskAPIInterfaces";

export interface ITaskListState {
  viewTaskPage: ITaskBody[];
  status: "idle" | "loading" | "failed";
  filterBy: "done" | "undone" | "all";
  order: "asc" | "desk";
  page: number;
  count: number;
}
