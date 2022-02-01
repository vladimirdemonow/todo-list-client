import styles from "./FilterStyle";
import buttonsStyle from "./FilterStyle.module.scss";

interface FilterElementProps {}

export default (props: FilterElementProps): JSX.Element => {
  return (
    <div className="filter" style={styles.filter}>
      <button
        className={
          "filter__all " + buttonsStyle.button_3 + " " + buttonsStyle.button_all
        }
      >
        All
      </button>
      <button
        className={
          "filter__done " +
          buttonsStyle.button_3 +
          " " +
          buttonsStyle.button_done
        }
      >
        Done
      </button>
      <button
        className={
          "filter__undone " +
          buttonsStyle.button_3 +
          " " +
          buttonsStyle.button_undone
        }
      >
        Undone
      </button>
    </div>
  );
};
