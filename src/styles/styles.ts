type IDisplay = "flex" | undefined
type IFlexAlignItems = "center"
type IFlexJustifyContent = "center"
type IWidth = "100px" | "200px" | "300px"
type IHeight = "100px" | "200px" | "300px"
type IFlexDirection = "column" | "row"


interface IStyleComponent {
    "display"? : IDisplay
    "align-items"? : IFlexAlignItems
    "justify-content" ?: IFlexJustifyContent
    "width"?: IWidth
    "height"? : IHeight
    "flex-direction"? : IFlexDirection
}

interface IStyles {
    main_container ?: IStyleComponent
    logo ?: IStyleComponent
    input_task ?: IStyleComponent
    buttons ?: IStyleComponent
    filter ?: IStyleComponent
    sort ?: IStyleComponent
    tasks ?: IStyleComponent
    task ?: IStyleComponent
    pages ?: IStyleComponent
}

const styles : IStyles = {}

export default styles