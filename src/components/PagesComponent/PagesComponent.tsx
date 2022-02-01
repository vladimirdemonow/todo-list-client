import styles from "./PagesStyle";
import buttonStyles from "./PagesButtonsStyle.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default (): JSX.Element => {
  const array = new Array(5).fill(1);

  return (
    <div className="pages" style={styles.pages}>
      <AiFillCaretLeft size={42}>
        <button></button>
      </AiFillCaretLeft>
      {array.map((element, index) => {
        return (
          <button className={buttonStyles.buttonPages} key={"key" + index}>
            {index + 1}
          </button>
        );
      })}
      <AiFillCaretRight size={42}>
        <button></button>
      </AiFillCaretRight>
    </div>
  );
};
