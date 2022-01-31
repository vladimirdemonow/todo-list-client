
import {IDisplay, IFlexJustifyContent, IWidth} from '../../styles/style-const'


// Pages interface
interface IPagesStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IWidth
}

// Task Element interface
interface IPagesElementStyle {
    pages: IPagesStyle
}



const styles : IPagesElementStyle = {
    pages: {
        display: "flex",
        justifyContent: "center",
        width: 300
    },
}

export default styles