import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Task {
  text: String;
  date: String;
}

export interface CounterState {
  value: number;
  taskList: Array<Task>
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  taskList: [],
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload)
    }
  },
});

export const { createTask } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTaskList = (state: RootState) => state.counter.taskList;

export default counterSlice.reducer;
