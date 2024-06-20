// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    designation: '',
    gender: '',
    email: '',
    mobile: '',
  },
  institutionDetails: {
    about: '',
    name: '',
    type: '',
    website: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: '',
  },
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload;
      state[section][field] = value;
    },
    setError: (state, action) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { updateField, setError, clearErrors } = formSlice.actions;
export default formSlice.reducer;
