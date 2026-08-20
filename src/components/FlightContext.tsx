import { createContext, useContext, useState } from "react";

type FlightData = {
  departure: string;
  arrival: string;
  passengers: number;
  tripType: string;
  departureDate: Date | null;
  returnDate: Date | null;
};

type SelectedTrain = {
  train : string;
  classType: string;
  price: number;
};
type SelectedClass = {
  type: string;
  price: number;
};
type BookingData = {
  train: any | null;
  selectedClass: SelectedClass | null;
  cart: { name: string; price: number }[];
  discount: number;
};

type FlightContextType = {
  flightData: FlightData;
  selectedTrain: SelectedTrain | null;
  bookingData: BookingData;
  setSelectedTrain: React.Dispatch<React.SetStateAction<SelectedTrain | null >>;
  setFlightData: React.Dispatch<React.SetStateAction<FlightData>>;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
};

const FlightContext = createContext<FlightContextType | null>(null);


export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flightData, setFlightData] = useState<FlightData>({
    departure: "",
    arrival: "",
    passengers: 1,
    tripType: "one-way",
    departureDate: null,
    returnDate: null
  });
  const [selectedTrain, setSelectedTrain] = useState<SelectedTrain | null>(null)
const [bookingData, setBookingData] = useState<BookingData>({
  train: null,
  selectedClass: null,
  cart: [],
  discount: 0,
});
  return (
    <FlightContext.Provider value={{ flightData, setFlightData, selectedTrain, setSelectedTrain, bookingData, setBookingData }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used inside FlightProvider");
  }
  return context;
};