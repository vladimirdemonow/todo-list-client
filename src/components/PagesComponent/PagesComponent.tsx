import styles from "./PagesComponent.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default (): JSX.Element => {
  const array = new Array(5).fill(1);

  return (
    <div className={styles.pages}>
      <AiFillCaretLeft size={42}>
        <button></button>
      </AiFillCaretLeft>
      {array.map((element, index) => {
        return (
          <button className={styles.buttonPages} key={"key" + index}>
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
