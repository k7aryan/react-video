import { createSlice } from '@reduxjs/toolkit';

const textBoxSlice = createSlice({
  name: 'textBoxes',
  initialState: [],
  reducers: {
    addTextBox: (state, action) => {
      state.push({ id: Date.now(), text: 'Sample Text', top: 50, left: 50, width: 100, height: 50 });
    },
    updateTextBox: (state, action) => {
      const { id, updates } = action.payload;
      const textBox = state.find((box) => box.id === id);
      if (textBox) {
        Object.assign(textBox, updates);
      }
    },
    deleteTextBox: (state, action) => {
      return state.filter((box) => box.id !== action.payload);
    },
  },
});

export const { addTextBox, updateTextBox, deleteTextBox } = textBoxSlice.actions;
export default textBoxSlice.reducer;
