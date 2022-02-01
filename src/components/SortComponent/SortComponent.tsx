import styles from "./SortComponent.module.scss";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

export default (): JSX.Element => {
  return (
    <div className={styles.sort}>
      <AiFillCaretUp size={35}>
        <button>Up</button>
      </AiFillCaretUp>
      <AiFillCaretDown size={35}>
        <button>Down</button>
      </AiFillCaretDown>
    </div>
  );
};
