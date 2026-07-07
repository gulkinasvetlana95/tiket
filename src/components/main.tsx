import React from 'react';
import { useState } from 'react';
import user from '../img/user.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useFlight } from "./FlightContext";

export default function Main() {
   const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState("one-way");
    const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const cities = [
  { value: "Tallinn", label: "Tallinn" },
  { value: "Riga", label: "Riga" },
  { value: "Vilnius", label: "Vilnius" },
  { value: "Warsaw", label: "Warsaw" },
  { value: "Berlin", label: "Berlin" },
  { value: "Paris", label: "Paris" },
  { value: "London", label: "London" },
];
const navigate = useNavigate();
const { flightData, setFlightData } = useFlight();

const handleTicket = () => {
  setFlightData({
    departure,
    arrival,
    passengers,
    tripType,
    departureDate,
    returnDate
  });

  navigate("/Flights");
};

  return (
   
    <main>
      
        <div className="ticket">
        <span className="ticket_title"> Let's Find That Ticket</span>
        <p className="ticket_text">Before Someone Else Does</p>
        </div>
        <div className="ticket_form">
      <label>
            <input type="radio" id="roundTrip" value="round-trip" checked={tripType === "round-trip"} onChange={(e) => setTripType(e.target.value)}/> Round trip </label>
         <label >
            <input type="radio" id="oneWay" value="one-way" checked={tripType === "one-way"} onChange={(e) => setTripType(e.target.value)} /> One way</label>
      
      <div className="passengers">
        <img className="passenger_icon" src={user} alt="user" />
         <button className="passenger-btn" onClick={() => setPassengers(Math.max(1, passengers - 1))}> – </button>
           <span>{passengers}</span>
         <button className="passenger-btn" onClick={() => setPassengers(passengers + 1)}> + </button>
      </div>
    </div>

    <div className="sending">

      <div className='departure'>
        <label className="city-label">Departure</label>
        <Select
        className="citi-select" classNamePrefix="citi-select" options={cities} placeholder="Your City/Station"
        value={cities.find( (city) => city.value === departure)}
        onChange={(selectedOption) =>
        setDeparture(selectedOption?.value || "")
       }
       components={{
         DropdownIndicator: () => null,
         IndicatorSeparator: () => null 
       }}
       />
      
        <label className="city-label">Pick your lucky day</label>
         <DatePicker className="city-input" selected={departureDate} onChange={(date: Date | null) => setDepartureDate(date)} dateFormat="d MMMM" placeholderText="Departure"/>
      </div>

      <div className= "arrival">
        <label className="city-label">Arrival</label>
        <Select className="citi-select"  classNamePrefix="citi-select" options={cities.filter( (city) => city.value !== departure)} placeholder="Where to?" value={cities.find( (city) => city.value === arrival)}
           onChange={(selectedOption) =>
           setArrival(selectedOption?.value || "")}
              components={{
               DropdownIndicator: () => null,
               IndicatorSeparator: () => null}}/>

       <DatePicker className="city-input bottom" selected={returnDate} onChange={(date: Date | null) => setReturnDate(date)} dateFormat="d MMMM" placeholderText="Return" disabled={tripType === "one-way"}  minDate={departureDate ?? undefined}/>
      </div>

    </div>
     <button className="button-passanger" onClick={handleTicket}> Tiket, Please! </button>
    </main>
    
  )
}
