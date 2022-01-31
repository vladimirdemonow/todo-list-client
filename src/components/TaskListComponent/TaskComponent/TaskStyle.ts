
import {IDisplay, IFlexJustifyContent} from '../../../styles/style-const'

interface ITaskStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
}


interface ITaskCheckStyle {
}


interface ITaskText {
}


interface ITaskDate {
}


interface ITaskDelete {
}

// Task Element interface
interface ITaskElementStyle {
    task: ITaskStyle
    task__check: ITaskCheckStyle
    task__text: ITaskText
    task__date: ITaskDate
    task__delete: ITaskDelete
}

const styles : ITaskElementStyle = {
    task: {
        display: "flex",
        justifyContent: "space-between"
    },
    task__check: {},
    task__text: {},
    task__date: {},
    task__delete: {},
}

export default styles