type IDisplay = "flex" | undefined
type IFlexAlignItems = "center"
type IFlexJustifyContent = "center" | "space-between"
type IWidth = 100 | 200 | 300
type IHeight = 100 | 200 | 300
type IFlexDirection = "column" | "row"


// MainContainer Interface

type IMainContainerWidth = 400 | 500 | 600
type IMainContainerMarginTop = 0 | 100 | 200

interface IMainContainerStyle {
    display?: IDisplay
    width?: IMainContainerWidth
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


// Filter interface
interface IFilterStyle {
    display: IDisplay
}

// Sort interface
interface ISortStyle {
    display: IDisplay
}

// Tasks interface
interface ITasksStyle {
    display: IDisplay
    flexDirection: IFlexDirection
    width: IWidth
}


// Task interface
interface ITaskStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
}


// Pages interface
interface IPagesStyle {
    display: IDisplay
    justifyContent: IFlexJustifyContent
    width: IWidth
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
    filter ?: IFilterStyle
    sort ?: ISortStyle
    tasks ?: ITasksStyle
    task ?: ITaskStyle
    pages ?: IPagesStyle
}

const wrapper : IWidth = 300

const styles : IStyles = {
    main_container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
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
    filter: {
        display: "flex"
    },
    sort: {
        display: "flex"
    },
    tasks: {
        display: "flex",
        flexDirection: "column",
        width: wrapper
    },
    task: {
        display: "flex",
        justifyContent: "space-between"
    },
    pages: {
        display:'flex',
        justifyContent: 'space-between',
        width: wrapper
    }
}

export default styles