import styles from "./SortComponent.module.scss";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSort, selectSort } from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  const sortSelector = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const activatedSort = {
    up: "",
    down: "",
    default: "",
  };

  activatedSort[sortSelector] += "green";

  return (
    <div className={styles.sort}>
      <AiFillCaretUp
        size={35}
        color={activatedSort["up"]}
        onClick={() => {
          dispatch(setSort("up"));
        }}
      >
        <button>Up</button>
      </AiFillCaretUp>
      <AiFillCaretDown
        size={35}
        color={activatedSort["down"]}
        onClick={() => {
          dispatch(setSort("down"));
        }}
      >
        <button>Down</button>
      </AiFillCaretDown>
    </div>
  );
};
