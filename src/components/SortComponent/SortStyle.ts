import {IDisplay, IFlexJustifyContent} from '../../styles/style-const'

interface ISortStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
}

// Task Element interface
interface ISortComponentStyle {
    sort: ISortStyle
}

const styles : ISortComponentStyle = {
    sort: {
        display: "flex",
        justifyContent: "space-between"
    }
}

export default styles