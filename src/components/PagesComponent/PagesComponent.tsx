import styles from "./PagesComponent.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { selectTaskList } from "../../features/counter/counterSlice";
import { useAppSelector } from "../../app/hooks";

export default (): JSX.Element => {
  const tasks = useAppSelector(selectTaskList);
  let count = 0;

  const arrayPage = tasks.filter((element) => {
    if (count !== 4) {
      count++;
      return false;
    } else {
      count = 0;
      return true;
    }
  });

  return (
    <div className={styles.pages}>
      <AiFillCaretLeft size={42}>
        <button></button>
      </AiFillCaretLeft>
      {arrayPage.map((element, index) => {
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
