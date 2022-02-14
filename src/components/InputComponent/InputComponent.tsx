import { Input } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { axiosTaskThunk } from "../../features/slices/taskListSlice";
import dayjs from "dayjs";
import { useRef } from "react";

export default () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<Input>(null);

  const onInputTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      inputRef.current?.setValue("");
    }

    if (event.key === "Enter") {
      const currentDate = dayjs(Date.now()).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );

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
      inputRef.current?.setValue("");
    }
  };

  return (
    <Input
      onBlur={(event) => {
        event.target.value = "";
      }}
      placeholder="I want to..."
      onKeyDownCapture={onInputTask}
      ref={inputRef}
      showCount
      maxLength={100}
    />
  );
};
