
import {IDisplay, IFlexJustifyContent, IMainWidth, wrapper} from '../../styles/style-const'


// Pages interface
interface IPagesStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IMainWidth
    marginTop: string
    paddingBottom: string
}

// Task Element interface
interface IPagesElementStyle {
    pages: IPagesStyle
}



const styles : IPagesElementStyle = {
    pages: {
        display: "flex",
        justifyContent: "center",
        width: wrapper,
        marginTop: '20px',
        paddingBottom: '20px'
    },
}

export default styles