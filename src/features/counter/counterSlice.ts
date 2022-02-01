import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ITask {
  id: any
  text: String;
  date: String;
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
  filter: 'done',
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
  },
});

export const { createTask, setFilter, setSort } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTaskList = (state: RootState) => state.counter.taskList;
export const selectFilter = (state: RootState) => state.counter.filter;
export const selectSort = (state: RootState) => state.counter.sort;

export default counterSlice.reducer;
