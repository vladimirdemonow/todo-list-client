import styles from "./SortComponent.module.scss";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

export default (): JSX.Element => {
  return (
    <div className={styles.sort}>
      <AiFillCaretUp>
        <button>Up</button>
      </AiFillCaretUp>
      <AiFillCaretDown>
        <button>Down</button>
      </AiFillCaretDown>
    </div>
  );
};
