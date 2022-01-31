interface TaskElementProps {
  id: String;
  text: String;
  date: String;
}

export default (props: TaskElementProps): JSX.Element => {
  return (
    <div className="task">
      <input className="task__check" type="checkbox"></input>
      <div className="task__text">{props.text}</div>
      <div className="task__date">{props.date}</div>
      <button className="task__delete">delete</button>
    </div>
  );
};
