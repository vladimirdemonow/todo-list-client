
import {IDisplay, IFlexJustifyContent, IMainWidth, wrapper} from '../../styles/style-const'


// Pages interface
interface IPagesStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IMainWidth
}

// Task Element interface
interface IPagesElementStyle {
    pages: IPagesStyle
}



const styles : IPagesElementStyle = {
    pages: {
        display: "flex",
        justifyContent: "center",
        width: wrapper
    },
}

export default styles