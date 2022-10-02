import {createSlice} from '@reduxjs/toolkit';

export const filteredItemsSlice = createSlice({
  name: 'filteredItemsData',
  initialState: {data: ''},
  reducers: {
    filteredItemsInRedux: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
    filteredItemsInRedux,
} = filteredItemsSlice.actions;

export const filteredItemsByUser = state => state.filteredItemsData.data;

export default filteredItemsSlice.reducer;