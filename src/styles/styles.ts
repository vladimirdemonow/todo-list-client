import {IDisplay, IFlexAlignItems, IFlexJustifyContent, IMainWidth, IMainHeight, IFlexDirection, wrapper} from './style-const'

// MainContainer Interface

type IMainContainerWidth = 500 | 700 | 1000
type IMainContainerHeight = 400 | 700 | 1000
type IMainContainerMarginTop = 0 | 100 | 200

interface IMainContainerStyle {
    display?: IDisplay
    width?: IMainContainerWidth
    height?: IMainContainerHeight
    marginTop?: IMainContainerMarginTop
    alignItems?: IFlexAlignItems
    justifyContent?: IFlexJustifyContent
    flexDirection?: IFlexDirection
}

// Logo interface
interface ILogoStyle {
    
}



// Buttons interface
interface IButtonsStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IMainWidth
}



// Tasks interface
interface ITaskListStyle {
    display: IDisplay
    flexDirection: IFlexDirection
    width: IMainWidth
}


// Task interface
interface ITaskStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
}


interface IStyles {
    main_container ?: IMainContainerStyle
    logo ?: ILogoStyle
    buttons ?: IButtonsStyle
    task ?: ITaskStyle
}


const styles : IStyles = {
    main_container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 100,
        height: 400,
        flexDirection: "column"
    },
    logo: {
        
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        width: wrapper
    },
    task: {
        display: "flex",
        justifyContent: "space-between"
    },
}

export default styles