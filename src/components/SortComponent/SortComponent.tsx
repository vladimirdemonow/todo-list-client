import styles from "./SortStyle";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

export default (): JSX.Element => {
  return (
    <div className="sort" style={styles.sort}>
      <AiFillCaretUp>
        <button>Up</button>
      </AiFillCaretUp>
      <AiFillCaretDown>
        <button>Down</button>
      </AiFillCaretDown>
    </div>
  );
};
