
import {IDisplay, IFlexJustifyContent} from '../../../styles/style-const'

interface ITaskStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
  marginTop: string
}


interface ITaskCheckStyle {
}


interface ITaskText {
    width: string
}


interface ITaskTextArea {
    width: string
    resize: string
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
    task__textarea: ITaskTextArea
}

const styles : ITaskElementStyle = {
    task: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: '20px'
    },
    task__check: {},
    task__text: {
        width: '400px'
    },
    task__textarea: {
        width: '400px',
        resize: 'none'
    },
    task__date: {},
    task__delete: {},
}

export default styles