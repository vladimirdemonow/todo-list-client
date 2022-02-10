import styles from "./TaskListComponent.module.scss";
import { AiFillBulb, AiFillFire, AiOutlineCoffee } from "react-icons/ai";

// Images on Empty pages
const defaultImages = {
  all: AiOutlineCoffee,
  done: AiFillFire,
  undone: AiFillBulb,
};

export function createDefaultImage(): JSX.Element {
  const Element = defaultImages["all"];
  return <Element className={styles.default} size={100} opacity={0.2} />;
}
