import styles from "./SortStyle";

interface SortElementProps {}

export default (props: SortElementProps): JSX.Element => {
  return (
    <div className="sort" style={styles.sort}>
      <button>Up</button>
      <button>Down</button>
    </div>
  );
};
