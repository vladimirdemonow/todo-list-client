
import {IWidth, wrapper} from '../../styles/style-const'



// InputTask interface
interface IInputTaskStyle {
    width: IWidth
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