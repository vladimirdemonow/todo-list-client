import { Menu, Dropdown, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectParams, setParams } from "../../features/slices/taskListSlice";

export default () => {
  const dispatch = useAppDispatch();
  const paramsSelector = useAppSelector(selectParams);

  const menu = (
    <Menu>
      <Menu.Item
        key="asc"
        onClick={() => {
          dispatch(setParams({ ...paramsSelector, order: "asc" }));
        }}
      >
        asc
      </Menu.Item>
      <Menu.Item
        key="desk"
        onClick={() => {
          dispatch(setParams({ ...paramsSelector, order: "desk" }));
        }}
      >
        desc
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topLeft" arrow>
      <Button>{paramsSelector.order}</Button>
    </Dropdown>
  );
};
