import styles from "./InputTaskComponentStyle";
import inputsStyle from "./style-inputs.module.scss";

interface PagesProps {
  text: String;
}

export default (props: PagesProps): JSX.Element => {
  // const inputTask = useRef(null);

  return (
    <div className={inputsStyle.form__group} style={styles.input_task}>
      <input
        type="input"
        // ref={inputTask}
        className={inputsStyle.form__field}
        placeholder="Name"
        name="name"
        id="name"
      />
    </div>
  );
};
