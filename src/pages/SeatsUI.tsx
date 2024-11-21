import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Bus, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "../utils/notifications";
import { RootState } from "../store/store";
import { setSelectedBus } from "../features/booking/bookingSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SeatsUIProps {
  isAdminView?: boolean;
}

const SeatsUI: React.FC<SeatsUIProps> = ({ isAdminView = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seats, selectedBus, buses } = useSelector(
    (state: RootState) => state.booking
  );
  const [selectedSeat, setSelectedSeat] = React.useState<string | null>(null);

  const currentBusSeats = seats[selectedBus] || {};

  const handleBusSelect = (busId: string) => {
    dispatch(setSelectedBus(busId));
  };

  const handleSeatClick = (seatId: string, isBooked: boolean) => {
    if (isAdminView) {
      setSelectedSeat(seatId);
      return;
    }
    if (isBooked) {
      showToast.warning("This seat is already booked!");
      return;
    }
    navigate(`/booking/${seatId}`);
  };

  const getRowSeats = (rowLetter: string) => {
    return Object.values(currentBusSeats)
      .filter((seat) => seat.id.startsWith(rowLetter))
      .sort((a, b) => a.id.localeCompare(b.id));
  };

  const SeatButton = ({ seat }) => (
    <button
      onClick={() => handleSeatClick(seat.id, seat.isBooked)}
      className={cn(
        "relative group p-3 sm:p-5 rounded-xl border-2 transition-all duration-300 transform w-16 h-16 sm:w-24 sm:h-24",
        "flex flex-col items-center justify-center",
        seat.isBooked
          ? "bg-gray-200 border-gray-300 cursor-not-allowed hover:shadow-none"
          : "bg-white border-blue-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-xl" />
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "text-sm sm:text-lg font-bold mb-0.5 sm:mb-1",
            seat.isBooked ? "text-gray-600" : "text-blue-600"
          )}
        >
          {seat.id}
        </span>
        <div
          className={cn(
            "text-[10px] sm:text-xs font-medium",
            seat.isBooked ? "text-gray-500" : "text-blue-400"
          )}
        >
          {seat.isBooked ? "Booked" : "Available"}
        </div>
      </div>
    </button>
  );

  const rows = ["A", "B", "C", "D", "E"];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Bus Selection - Only show if NOT in admin view */}
      {!isAdminView && (
        <Card className="max-w-4xl mx-auto mb-6">
          <div className="p-4 sm:p-6">
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bus
              </label>
              <Select value={selectedBus} onValueChange={handleBusSelect}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Choose a bus" />
                </SelectTrigger>
                <SelectContent>
                  {buses.map((bus) => (
                    <SelectItem key={bus} value={bus}>
                      Bus {bus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {/* Seats Layout */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 sm:p-8">
          <div className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 flex items-center justify-center gap-2 sm:gap-3 text-blue-600">
            <Bus className="w-8 h-8 sm:w-10 sm:h-10" />
            <span>Bus {selectedBus}</span>
          </div>

          <div className="relative bg-gray-50 p-4 sm:p-10 rounded-2xl shadow-md">
            <div className="absolute right-4 sm:right-10 top-3 sm:top-5 flex items-center gap-2 sm:gap-3 bg-blue-100 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm">
              <UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-sm sm:text-base font-medium text-blue-700">
                Driver
              </span>
            </div>

            <div className="mt-16 sm:mt-20 space-y-4 sm:space-y-6">
              {rows.map((rowLetter) => {
                const rowSeats = getRowSeats(rowLetter);
                return (
                  <div key={rowLetter} className="flex justify-between">
                    <div className="w-16 sm:w-24">
                      <SeatButton seat={rowSeats[0]} />
                    </div>

                    <div className="w-16 sm:w-20 relative">
                      <div className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-gray-300" />
                    </div>

                    <div className="flex gap-2 sm:gap-4">
                      {rowSeats.slice(1, 3).map((seat) => (
                        <SeatButton key={seat.id} seat={seat} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-12 flex justify-center gap-4 sm:gap-8 border-t pt-4 sm:pt-6 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm">
                <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-lg bg-white border-2 border-blue-300 shadow-sm" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm">
                <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-sm" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  Booked
                </span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-between px-2 sm:px-4">
              <div className="bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm border border-blue-200">
                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                  ← Entry
                </span>
              </div>
              <div className="bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm border border-blue-200">
                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                  Exit →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Seat Details Dialog - Only show in admin view */}
      {isAdminView && (
        <Dialog
          open={!!selectedSeat}
          onOpenChange={() => setSelectedSeat(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Seat Details - {selectedSeat}
              </DialogTitle>
            </DialogHeader>
            {selectedSeat && currentBusSeats[selectedSeat]?.isBooked ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-600">Name:</div>
                  <div className="font-semibold">
                    {currentBusSeats[selectedSeat].booking?.name}
                  </div>
                  <div className="font-medium text-gray-600">Destination:</div>
                  <div className="font-semibold">
                    {currentBusSeats[selectedSeat].booking?.destination}
                  </div>
                  <div className="font-medium text-gray-600">Time:</div>
                  <div className="font-semibold">
                    {currentBusSeats[selectedSeat].booking?.time}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-green-50 rounded-lg">
                <p className="text-green-600 font-medium">
                  This seat is available for booking
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SeatsUI;
