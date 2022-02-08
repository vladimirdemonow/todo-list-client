import styles from "./SortComponent.module.scss";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSort, selectSort, TSort } from "../../features/slices/orderSlice";
import { IconType } from "react-icons/lib";
import { getTasksRequest, postTaskRequest } from "../../api/Task/TaskAPI";

export default (): JSX.Element => {
  const sortSelector = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.sort}>
      {createSortButton(sortSelector, dispatch)}
    </div>
  );
};

function createSortButton(sortSelector: TSort, dispatch: any) {
  const Element: IconType =
    sortSelector === "up" ? AiFillCaretUp : AiFillCaretDown;
  return (
    <Element
      size={35}
      onClick={() => {
        dispatch(setSort(sortSelector === "up" ? "down" : "up"));
        // getTasksRequest();
        postTaskRequest({
          name: "string111",
          done: true,
          createdAt: "2022-02-08T15:35:53.815Z",
          updatedAt: "2022-02-08T15:35:53.815Z",
        });
      }}
    />
  );
}
