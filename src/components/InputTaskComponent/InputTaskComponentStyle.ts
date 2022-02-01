
import {IMainWidth, wrapper} from '../../styles/style-const'



// InputTask interface
interface IInputTaskStyle {
    width: IMainWidth
}

interface IInputTaskElementStyle {
    input_task ?: IInputTaskStyle
}


const styles : IInputTaskElementStyle = {
    input_task: {
        width: wrapper
    },
}

export default styles