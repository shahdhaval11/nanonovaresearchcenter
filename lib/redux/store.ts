import { configureStore } from "@reduxjs/toolkit";
import enquiriesReducer from "./slices/enquiriesSlice";

export const store = configureStore({
  reducer: {
    enquiries: enquiriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
