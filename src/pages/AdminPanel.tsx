import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedBus } from "../features/booking/bookingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import SeatsUI from "./SeatsUI";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { buses, seats, selectedBus } = useSelector(
    (state: RootState) => state.booking
  );
  const [showSeats, setShowSeats] = React.useState(false);

  const currentBusSeats = seats[selectedBus] || {};

  const bookedSeats = Object.values(currentBusSeats).filter(
    (seat) => seat.isBooked
  );

  const busStats = {
    total: Object.keys(currentBusSeats).length,
    booked: bookedSeats.length,
    available: Object.keys(currentBusSeats).length - bookedSeats.length,
  };

  const handleBusSelect = (busId: string) => {
    dispatch(setSelectedBus(busId));
    setShowSeats(false);
  };

  const handleViewSeats = () => {
    setShowSeats(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto space-y-4">
            <label className="text-sm font-medium block">Select Bus</label>
            <Select value={selectedBus} onValueChange={handleBusSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select bus" />
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
        </CardContent>
      </Card>

      {selectedBus && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-2xl font-bold text-blue-600">
                  <Bus className="w-8 h-8" />
                  <span>Bus {selectedBus}</span>
                </div>
                <Button
                  onClick={handleViewSeats}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  View Seats Layout
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm font-medium">
                    Total Seats
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {busStats.total}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm font-medium">
                    Available
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {busStats.available}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm font-medium">
                    Booked
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {busStats.booked}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showSeats && <SeatsUI isAdminView />}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Bookings for Bus {selectedBus}</span>
            <span className="text-sm text-gray-500 font-normal">
              ({bookedSeats.length} bookings)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seat</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookedSeats.length > 0 ? (
                  bookedSeats.map((seat) => (
                    <TableRow key={seat.id}>
                      <TableCell className="font-medium">{seat.id}</TableCell>
                      <TableCell>{seat.booking?.name}</TableCell>
                      <TableCell>{seat.booking?.destination}</TableCell>
                      <TableCell>{seat.booking?.time}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No bookings found for this bus
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
