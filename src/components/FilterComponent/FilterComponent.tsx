import styles from "./FilterComponent.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setFilter,
  selectFilter,
  TFilter,
} from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  const filterSelector = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const { button_all: all, button_done: done, button_undone: undone } = styles;

  const stylesFilter = {
    all,
    done,
    undone,
  };

  const activatedFilter = {
    all: " ",
    done: " ",
    undone: " ",
  };

  activatedFilter[filterSelector] += stylesFilter[filterSelector];

  return (
    <div className={styles.filter}>
      <button
        className={styles.button_3 + activatedFilter["all"]}
        onClick={() => {
          dispatch(setFilter("all"));
        }}
      >
        All
      </button>
      <button
        className={styles.button_3 + activatedFilter["done"]}
        onClick={() => {
          dispatch(setFilter("done"));
        }}
      >
        Done
      </button>
      <button
        className={styles.button_3 + activatedFilter["undone"]}
        onClick={() => {
          dispatch(setFilter("undone"));
        }}
      >
        Undone
      </button>
    </div>
  );
};
