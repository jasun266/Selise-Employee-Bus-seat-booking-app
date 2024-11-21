import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingState, Seat } from "./types";
import { loadFromLocalStorage } from "../../utils/localStorage";

const seatIds = [
  "A1",
  "A2",
  "A3",
  "B1",
  "B2",
  "B3",
  "C1",
  "C2",
  "C3",
  "D1",
  "D2",
  "D3",
  "E1",
  "E2",
  "E3",
];

const createEmptySeats = () => {
  const seats: Record<string, Seat> = {};
  seatIds.forEach((id) => {
    seats[id] = {
      id,
      isBooked: false,
    };
  });
  return seats;
};

export const createInitialState = (): BookingState => {
  const state: BookingState = {
    seats: {},
    selectedBus: "S098",
    buses: ["S098", "S099", "S100"],
    destinations: ["MIRPUR 11", "DHANMONDI", "GULSHAN", "UTTARA"],
    times: ["8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM"],
  };

  state.buses.forEach((busNo) => {
    state.seats[busNo] = createEmptySeats();
  });

  return state;
};

export const initialState: BookingState =
  loadFromLocalStorage() || createInitialState();

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookSeat: (
      state,
      action: PayloadAction<{
        busNo: string;
        seatId: string;
        booking: Omit<Seat["booking"], "busNo">;
      }>
    ) => {
      const { busNo, seatId, booking } = action.payload;
      if (state.seats[busNo]?.[seatId]) {
        state.seats[busNo][seatId] = {
          ...state.seats[busNo][seatId],
          isBooked: true,
          booking: {
            ...booking,
            busNo,
          },
        };
      }
    },
    setSelectedBus: (state, action: PayloadAction<string>) => {
      state.selectedBus = action.payload;
      if (!state.seats[action.payload]) {
        state.seats[action.payload] = createEmptySeats();
      }
    },
    resetAllData: (state) => {
      const newState = createInitialState();
      Object.assign(state, newState);
    },
  },
});

export const { bookSeat, setSelectedBus, resetAllData } = bookingSlice.actions;
export default bookingSlice.reducer;
