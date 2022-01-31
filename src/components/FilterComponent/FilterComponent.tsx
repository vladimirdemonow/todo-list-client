import styles from "./FilterStyle";

interface FilterElementProps {}

export default (props: FilterElementProps): JSX.Element => {
  return (
    <div className="filter" style={styles.filter}>
      <button className="filter__all">All</button>
      <button className="filter__done">Done</button>
      <button className="filter__undone">Undone</button>
    </div>
  );
};
