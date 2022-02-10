import styles from "./FilterComponent.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setFilter,
  selectFilter,
  TFilter,
} from "../../features/slices/orderSlice";
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

export default (): JSX.Element => {
  const filterSelector = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filter}>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            axiosPostTaskRequest({
              name: e.currentTarget.value,
              done: true,
              createdAt: "2022-02-10T09:41:35.598Z",
              updatedAt: "2022-02-10T09:41:35.598Z",
            }).then((response: IAxiosResponseTaskBody) => {
              console.log(response.status);
            });
            e.currentTarget.value = "";
          }
        }}
        placeholder="add task"
      />
      <button
        onClick={() => {
          axiosGetTaskListRequest({ pp: 20 }).then(
            (response: IAxiosResponseTaskListBody) => {
              console.log(response.data.tasks);
            }
          );
        }}
      >
        getAllTasks
      </button>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            axiosPatchTaskRequest(e.currentTarget.value, {
              name: "text" + Date.now().toString(),
              done: true,
              createdAt: "2022-02-10T09:41:35.598Z",
              updatedAt: "2022-02-10T09:41:35.598Z",
            }).then((response: IAxiosResponseTaskBody) => {
              console.log(response.status);
            });
            e.currentTarget.value = "";
          }
        }}
        placeholder="change task"
      />

      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            axiosDeleteTaskRequest(e.currentTarget.value).then(
              (response: IAxiosResponseTaskBody) => {
                console.log(response.status);
              }
            );
            e.currentTarget.value = "";
          }
        }}
        placeholder="delete task"
      />
      {createFilterButton("all", dispatch, filterSelector)}
      {createFilterButton("done", dispatch, filterSelector)}
      {createFilterButton("undone", dispatch, filterSelector)}
    </div>
  );
};

const { button_all: all, button_done: done, button_undone: undone } = styles;

const stylesFilter = {
  all,
  done,
  undone,
};

function createFilterButton(
  currentFilter: TFilter,
  dispatch: any,
  activeFilter: TFilter
): JSX.Element {
  return (
    <button
      className={
        styles.button +
        (currentFilter === activeFilter ? " " + stylesFilter[activeFilter] : "")
      }
      key={currentFilter}
      onClick={() => dispatch(setFilter(currentFilter))}
    >
      {currentFilter}
    </button>
  );
}
