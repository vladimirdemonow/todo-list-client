import { Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  axiosGetTaskListThunk,
  selectViewTaskPage,
  selectCount,
  setParams,
} from "../../features/slices/taskListSlice";

export default () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const viewTaskPage = useAppSelector(selectViewTaskPage);

  useEffect(() => {
    if (viewTaskPage.length === 0 && count > 0) {
      dispatch(setParams({ page: currentPage - 1 }));
      setCurrentPage(currentPage - 1);
    }
  }, [viewTaskPage]);

  return (
    <Pagination
      defaultCurrent={1}
      current={currentPage}
      total={count}
      pageSize={5}
      onChange={(page) => {
        dispatch(setParams({ page }));
        setCurrentPage(page);
      }}
      hideOnSinglePage
    />
  );
};
