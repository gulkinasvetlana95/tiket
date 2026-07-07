import { createContext, useContext, useState } from "react";

type FlightData = {
  departure: string;
  arrival: string;
  passengers: number;
  tripType: string;
  departureDate: Date | null;
  returnDate: Date | null;
};

type FlightContextType = {
  flightData: FlightData;
  setFlightData: React.Dispatch<React.SetStateAction<FlightData>>;
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

  return (
    <FlightContext.Provider value={{ flightData, setFlightData }}>
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