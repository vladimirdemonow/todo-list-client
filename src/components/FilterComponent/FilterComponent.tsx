import { Menu, Dropdown, Button } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { getTaskListAsync } from "../../features/slices/taskListSlice";

export default () => {
  const dispatch = useAppDispatch();

  const menu = (
    <Menu>
      <Menu.Item onClick={() => dispatch(getTaskListAsync({}))}>All</Menu.Item>
      <Menu.Item
        onClick={() => dispatch(getTaskListAsync({ filterBy: "done" }))}
      >
        Done
      </Menu.Item>
      <Menu.Item
        onClick={() => dispatch(getTaskListAsync({ filterBy: "undone" }))}
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
