import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookSeat } from "../features/booking/bookingSlice";
import { RootState } from "../store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "../utils/notifications";
import { User, Bus, MapPin, Clock, Armchair, TicketIcon } from "lucide-react";

const BookingForm = () => {
  const { seatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBus, destinations, times } = useSelector(
    (state: RootState) => state.booking
  );

  const [formData, setFormData] = React.useState({
    name: "",
    destination: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seatId) return;

    if (!formData.name || !formData.destination || !formData.time) {
      showToast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(
        bookSeat({
          busNo: selectedBus,
          seatId,
          booking: formData,
        })
      );

      showToast.success("Booking successful!");
      navigate("/");
    } catch (error) {
      showToast.error("Something went wrong while booking the seat.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <div className="flex items-center justify-center gap-2">
            <TicketIcon className="w-8 h-8" />
            <CardTitle className="text-2xl font-bold text-center">
              Seat Booking Form
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Name
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Bus className="w-4 h-4 text-blue-600" />
                Bus Number
              </label>
              <Input value={selectedBus} disabled className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Armchair className="w-4 h-4 text-blue-600" />
                Seat Number
              </label>
              <Input value={seatId} disabled className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Destination
              </label>
              <Select
                value={formData.destination}
                onValueChange={(value) =>
                  setFormData({ ...formData, destination: value })
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Time
              </label>
              <Select
                value={formData.time}
                onValueChange={(value) =>
                  setFormData({ ...formData, time: value })
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <TicketIcon className="w-5 h-5" />
              Book Seat
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
