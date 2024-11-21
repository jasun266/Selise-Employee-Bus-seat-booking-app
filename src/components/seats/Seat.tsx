import React from "react";
import { cn } from "@/lib/utils";
import { ChairIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface SeatProps {
  id: string;
  isBooked: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  booking?: {
    name: string;
    destination: string;
    time: string;
  };
  disabled?: boolean;
}

export const Seat: React.FC<SeatProps> = ({
  id,
  isBooked,
  isSelected,
  onClick,
  booking,
  disabled,
}) => {
  const seatContent = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-16 h-16 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1",
        isBooked
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-blue-50 border-2",
        isSelected && "border-2 border-blue-500",
        !isBooked && !disabled && "hover:border-blue-500",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <ChairIcon
        className={cn("w-6 h-6", isBooked ? "text-gray-500" : "text-blue-500")}
      />
      <span className="text-xs font-medium">{id}</span>
    </button>
  );

  if (booking) {
    return (
      <Tooltip
        content={
          <div className="bg-white p-3 rounded-lg shadow-lg border">
            <p className="font-medium text-gray-900">{booking.name}</p>
            <div className="mt-1 space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Destination:</span>{" "}
                {booking.destination}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Time:</span> {booking.time}
              </p>
            </div>
          </div>
        }
      >
        {seatContent}
      </Tooltip>
    );
  }

  return seatContent;
};
