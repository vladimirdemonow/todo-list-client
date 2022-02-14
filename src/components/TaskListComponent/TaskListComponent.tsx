import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Checkbox, Input, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useRef, useState } from "react";
import { ITaskBody } from "../../api/taskAPI/taskAPIInterfaces";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ITaskListState } from "../../features/slices/taskListInterface";
import {
  axiosGetTaskListThunk,
  axiosTaskThunk,
  selectIsToUpdateTaskPage,
  selectParams,
  selectStatus,
  selectViewTaskPage,
  setParams,
} from "../../features/slices/taskListSlice";

import { DeleteOutlined } from "@ant-design/icons";

type TTaskBodyTableDone = {
  taskBody: ITaskBody;
  done: boolean;
};

type TTaskBodyTableDelete = {
  taskBody: ITaskBody;
};

interface ITaskBodyTable {
  key: React.Key;
  check: TTaskBodyTableDone;
  delete: TTaskBodyTableDelete;
}

export default () => {
  const dispatch = useAppDispatch();
  const viewTaskPageSelector = useAppSelector(selectViewTaskPage);
  const paramsSelector = useAppSelector(selectParams);

  const isToUpdateSelector = useAppSelector(selectIsToUpdateTaskPage);

  const [taskBodyTable, setTaskBodyTable] = useState<ITaskBodyTable[]>();

  useEffect(() => {
    if (isToUpdateSelector) {
      dispatch(axiosGetTaskListThunk(paramsSelector));
    }
  }, [isToUpdateSelector]);

  useEffect(() => {
    setTaskBodyTable(
      viewTaskPageSelector.map((element) => ({
        ...element,
        key: element.uuid ? element.uuid : "",
        check: {
          taskBody: element,
          done: element.done,
        },
        delete: {
          taskBody: element,
        },
        name: element,
      }))
    );
  }, [viewTaskPageSelector]);

  useEffect(() => {
    dispatch(axiosGetTaskListThunk(paramsSelector));
  }, [paramsSelector]);

  return (
    <Table dataSource={taskBodyTable} pagination={false}>
      <Column
        dataIndex="check"
        key="check"
        render={({ taskBody, done }: TTaskBodyTableDone) => {
          return (
            <Checkbox
              checked={done}
              onChange={() => {
                dispatch(
                  axiosTaskThunk({
                    method: "patch",
                    data: { ...taskBody, done: !done },
                  })
                );
              }}
            />
          );
        }}
      />
      <Column
        dataIndex="name"
        key="name"
        render={(data: ITaskBody) => {
          const inputRef = useRef<Input>(null);

          const [currentText, setCurrentText] = useState(data.name);

          return (
            <Input
              ref={inputRef}
              defaultValue={currentText}
              onBlur={(event) => {
                inputRef.current?.setValue(currentText);
              }}
              onPressEnter={(event) => {
                event.currentTarget.blur();

                setCurrentText(event.currentTarget.value);
                inputRef.current?.setValue(event.currentTarget.value);
                dispatch(
                  axiosTaskThunk({
                    method: "patch",
                    data: {
                      ...data,
                      name: event.currentTarget.value,
                    },
                  })
                );
              }}
            />
          );
        }}
      />
      <Column align="right" dataIndex="updatedAt" key="updatedAt" />
      <Column
        align="center"
        dataIndex="delete"
        key="delete"
        render={({ taskBody }: TTaskBodyTableDelete) => {
          return (
            <DeleteOutlined
              onClick={() => {
                dispatch(
                  axiosTaskThunk({
                    method: "delete",
                    data: { ...taskBody },
                  })
                );
              }}
            />
          );
        }}
      />
    </Table>
  );
};
