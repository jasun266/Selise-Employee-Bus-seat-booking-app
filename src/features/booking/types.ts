// src/features/booking/types.ts
export interface Seat {
  id: string;
  isBooked: boolean;
  booking?: {
    name: string;
    destination: string;
    time: string;
    busNo: string;
  };
}

export interface BookingState {
  seats: Record<string, Record<string, Seat>>;
  selectedBus: string;
  buses: string[];
  destinations: string[];
  times: string[];
}
