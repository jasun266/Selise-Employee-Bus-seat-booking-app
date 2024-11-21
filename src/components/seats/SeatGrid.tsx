import React from "react";
import { Seat } from "./Seat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SteeringWheel } from "lucide-react";

interface SeatGridProps {
  seats: Array<{
    id: string;
    isBooked: boolean;
    booking?: {
      name: string;
      destination: string;
      time: string;
    };
  }>;
  onSeatClick: (seatId: string) => void;
  selectedSeat?: string;
  busNumber: string;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  onSeatClick,
  selectedSeat,
  busNumber,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center flex items-center justify-center gap-2 flex-wrap">
          <SteeringWheel className="w-6 h-6 text-blue-500" />
          <span className="break-words">Bus {busNumber} - Seat Layout</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6">
        {/* Main Container with max-width control */}
        <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
          {/* Responsive Grid Container */}
          <div className="relative grid grid-cols-3 gap-2 sm:gap-4 w-full">
            {/* Driver Section - Responsive positioning */}
            <div
              className="absolute -top-8 right-0 sm:static flex items-center justify-center bg-gray-100 rounded-full p-2 sm:p-4 col-span-1"
              style={{ gridColumn: "3", gridRow: "1" }}
            >
              <SteeringWheel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="hidden sm:inline font-medium text-gray-600 ml-2">
                Driver
              </span>
            </div>

            {/* Seat Grid - Now fully responsive */}
            <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-0">
              {seats.map((seat, index) => (
                <div key={seat.id} className="flex justify-center">
                  <Seat
                    id={seat.id}
                    isBooked={seat.isBooked}
                    isSelected={selectedSeat === seat.id}
                    onClick={() => onSeatClick(seat.id)}
                    booking={seat.booking}
                    className="w-full max-w-[80px] aspect-square"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Legend - Responsive spacing and layout */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-4 mt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 bg-white" />
              <span className="text-xs sm:text-sm text-gray-600">
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200" />
              <span className="text-xs sm:text-sm text-gray-600">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-blue-500 bg-white" />
              <span className="text-xs sm:text-sm text-gray-600">Selected</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
