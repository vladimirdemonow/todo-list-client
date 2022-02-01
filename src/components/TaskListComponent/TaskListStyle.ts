
import {IDisplay, IFlexJustifyContent, IFlexDirection, IMainWidth, wrapper} from '../../styles/style-const'

interface ITaskListStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
  flexDirection: IFlexDirection
  width: IMainWidth
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
        width: wrapper
    },
}

export default styles