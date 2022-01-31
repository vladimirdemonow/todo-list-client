import styles from "./PagesStyle";

interface PagesProps {
  count: Number;
}

export default (props: PagesProps): JSX.Element => {
  const array = new Array(props.count).fill(1);

  return (
    <div className="pages" style={styles.pages}>
      {array.map((element, index) => {
        return <button key={"key" + index}>{index + 1}</button>;
      })}
    </div>
  );
};
