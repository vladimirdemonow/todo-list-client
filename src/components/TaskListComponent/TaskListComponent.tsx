import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { ITaskBody } from "../../api/taskAPI/taskAPIInterfaces";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectViewTaskPage } from "../../features/slices/taskListSlice";

interface ITaskBodyTable extends ITaskBody {
  key: React.Key;
}

const columns = [
  {
    title: "Task",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updated",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ITaskBodyTable[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: ITaskBody) => {
    console.log(record);

    return {
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    };
  },
};

export default () => {
  const dispatch = useAppDispatch();
  const viewTaskPageSelector = useAppSelector(selectViewTaskPage);

  const [taskBodyTable, setTaskBodyTable] = useState<ITaskBodyTable[]>();

  useEffect(() => {
    setTaskBodyTable(
      viewTaskPageSelector.map((element) => ({ ...element, key: element.uuid }))
    );
  }, [viewTaskPageSelector]);

  return (
    <Table
      rowSelection={{ type: "checkbox", ...rowSelection }}
      dataSource={taskBodyTable}
      columns={columns}
    />
  );
};
