import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ITask {
  id: string
  text: String;
  date: String;
  isCompleted: boolean
  timeStamp: number
}

export type TFilter = 'all' | 'done' | 'undone'
export type TSort = 'up' | 'down' | 'default'


export interface CounterState {
  taskList: Array<ITask>
  filter: TFilter
  sort: TSort
}

const initialState: CounterState = {
  taskList: [],
  filter: 'all',
  sort: 'default',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.taskList.push(action.payload)
    },
    setFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.taskList.find((element, index, array) => {
        if(element.id === action.payload) {
          array[index].isCompleted = true;
        }
      })
    },
    uncompleteTask: (state, action: PayloadAction<string>) => {
      state.taskList.find((element, index, array) => {
        if(element.id === action.payload) {
          array[index].isCompleted = false;
        }
      })
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((element) => {
        return (element.id === action.payload) ?  false : true
      })
    },
  },
});

export const { createTask, setFilter, setSort, completeTask, uncompleteTask, deleteTask } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTaskList = (state: RootState) => state.counter.taskList;
export const selectFilter = (state: RootState) => state.counter.filter;
export const selectSort = (state: RootState) => state.counter.sort;

export default counterSlice.reducer;
