import {IDisplay, IFlexJustifyContent} from '../../styles/style-const'

interface IFilterStyle {
  display: IDisplay;
  justifyContent: IFlexJustifyContent;
}


interface IFilterAllStyle {

}

interface IFilterDoneStyle {

}

interface IFilterUndoneStyle {

}

// Task Element interface
interface IFilterComponentStyle {
    filter: IFilterStyle
    filter__all: IFilterAllStyle
    filter__done: IFilterDoneStyle
    filter__undone: IFilterUndoneStyle
}

const styles : IFilterComponentStyle = {
    filter: {
        display: "flex",
        justifyContent: "space-between"
    },
    filter__all: {},
    filter__done: {},
    filter__undone: {},
}

export default styles