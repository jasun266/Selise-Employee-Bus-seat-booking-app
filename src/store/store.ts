import { configureStore } from "@reduxjs/toolkit";
import bookingReducer, { initialState } from "../features/booking/bookingSlice";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorage";

const savedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  preloadedState: {
    booking: savedState || initialState,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state.booking);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
