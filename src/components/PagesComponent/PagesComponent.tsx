import styles from "./PagesStyle";
import buttonStyles from "./PagesButtonsStyle.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface PagesProps {
  count: Number;
}

export default (props: PagesProps): JSX.Element => {
  const array = new Array(props.count).fill(1);

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
