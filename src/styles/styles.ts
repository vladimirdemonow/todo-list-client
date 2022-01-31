import {IDisplay, IFlexAlignItems, IFlexJustifyContent, IWidth, IHeight, IFlexDirection, wrapper} from './style-const'

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

// InputTask interface
interface IInputTaskStyle {
    width: IWidth
}


// Buttons interface
interface IButtonsStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IWidth
}



// Tasks interface
interface ITaskListStyle {
    display: IDisplay
    flexDirection: IFlexDirection
    width: IWidth
}


// Task interface
interface ITaskStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
}



interface IStyleComponent {
    display? : IDisplay
    alignItems? : IFlexAlignItems
    justifyContent ?: IFlexJustifyContent
    width?: IWidth
    height? : IHeight
    flexDirection? : IFlexDirection
}

interface IStyles {
    main_container ?: IMainContainerStyle
    logo ?: ILogoStyle
    input_task ?: IInputTaskStyle
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
    input_task: {
        width: wrapper
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