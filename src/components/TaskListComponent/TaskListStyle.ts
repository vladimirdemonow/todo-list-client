
import {IDisplay, IFlexJustifyContent, IFlexDirection, IWidth} from '../../styles/style-const'

interface ITaskListStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
  flexDirection: IFlexDirection
  width: IWidth
}

// Task Element interface
interface ITaskElementStyle {
    task_list: ITaskListStyle
}

const styles : ITaskElementStyle = {
    task_list: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'column',
        width: 300
    },
}

export default styles