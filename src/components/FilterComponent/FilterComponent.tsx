import { Menu, Dropdown, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  axiosGetTaskListThunk,
  axiosTaskThunk,
  selectParams,
  setParams,
} from "../../features/slices/taskListSlice";

export default () => {
  const dispatch = useAppDispatch();
  const paramsSelector = useAppSelector(selectParams);

  const menu = (
    <Menu>
      <Menu.Item
        key="all"
        onClick={() => {
          dispatch(setParams({ ...paramsSelector, filterBy: "" }));
        }}
      >
        All
      </Menu.Item>
      <Menu.Item
        key="done"
        onClick={() => {
          dispatch(setParams({ ...paramsSelector, filterBy: "done" }));
        }}
      >
        Done
      </Menu.Item>
      <Menu.Item
        key="undone"
        onClick={() => {
          dispatch(setParams({ ...paramsSelector, filterBy: "undone" }));
        }}
      >
        Undone
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topLeft" arrow>
      <Button>Filter</Button>
    </Dropdown>
  );
};
