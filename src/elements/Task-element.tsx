export default (text: String, date: String) => {
  return (
    <div className="task">
      <input className="task__check" type="checkbox"></input>
      <div className="task__text">{text}</div>
      <div className="task__date">{date}</div>
      <button className="task__delete">delete</button>
    </div>
  );
};
