import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/libs/store/features/formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
