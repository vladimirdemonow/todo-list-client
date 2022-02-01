import styles from "./FilterComponent.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setFilter,
  selectFilter,
  TFilter,
} from "../../features/counter/counterSlice";

export default (): JSX.Element => {
  return (
    <div className={styles.filter}>
      <button className={styles.button_3 + " " + styles.button_all}>All</button>
      <button className={styles.button_3 + " " + styles.button_done}>
        Done
      </button>
      <button className={styles.button_3 + " " + styles.button_undone}>
        Undone
      </button>
    </div>
  );
};
