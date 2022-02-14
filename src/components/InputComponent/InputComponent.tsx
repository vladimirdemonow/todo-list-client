import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Input } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { ITaskListState } from "../../features/slices/taskListInterface";
import { axiosTaskThunk } from "../../features/slices/taskListSlice";
import dayjs from "dayjs";
const axios = require("axios");

export default () => {
  const dispatch = useAppDispatch();

  return (
    <Input
      placeholder="I want to..."
      onKeyDownCapture={(event) => {
        onInputTask(event, dispatch);
      }}
      showCount
    />
  );
};

const onInputTask = (
  event: React.KeyboardEvent<HTMLInputElement>,
  dispatch: ThunkDispatch<
    {
      taskList: ITaskListState;
    },
    null,
    AnyAction
  >
) => {
  if (event.key === "Escape") {
    event.currentTarget.value = "";
  }

  if (event.key === "Enter") {
    const currentDate = dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    dispatch(
      axiosTaskThunk({
        method: "post",
        data: {
          name: event.currentTarget.value,
          done: false,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      })
    );
    event.currentTarget.value = "";
  }
};
