import styles from "./FilterComponent.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  axiosDeleteTaskRequest,
  axiosGetTaskListRequest,
  axiosPatchTaskRequest,
  axiosPostTaskRequest,
} from "../../api/taskAPI/taskAPI";
import {
  IAxiosResponseTaskBody,
  IAxiosResponseTaskListBody,
} from "../../api/taskAPI/taskAPIInterfaces";
import {
  deleteTaskAsync,
  getTaskListAsync,
  patchTaskAsync,
  postTaskAsync,
} from "../../features/slices/taskListSlice";

export default (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filter}>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              postTaskAsync({
                name: e.currentTarget.value,
                done: true,
                createdAt: "2022-02-10T09:41:35.598Z",
                updatedAt: "2022-02-10T09:41:35.598Z",
              })
            );

            e.currentTarget.value = "";
          }
        }}
        placeholder="add task"
      />
      <button
        onClick={() => {
          dispatch(getTaskListAsync({}));
        }}
      >
        getAllTasks
      </button>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              patchTaskAsync({
                name: "Text" + Date.now().toString(),
                done: true,
                createdAt: "2022-02-10T09:41:35.598Z",
                updatedAt: "2022-02-10T09:41:35.598Z",
                uuid: e.currentTarget.value,
              })
            );
            e.currentTarget.value = "";
          }
        }}
        placeholder="change task"
      />

      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              deleteTaskAsync({
                name: "Text" + Date.now().toString(),
                done: true,
                createdAt: "2022-02-10T09:41:35.598Z",
                updatedAt: "2022-02-10T09:41:35.598Z",
                uuid: e.currentTarget.value,
              })
            );
            e.currentTarget.value = "";
          }
        }}
        placeholder="delete task"
      />
    </div>
  );
};
