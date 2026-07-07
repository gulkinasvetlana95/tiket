import React from 'react';
import {useFlight} from "./FlightContext";


function getArrivalDate(
  
  departureDate: Date,
  departureTime: string,
  arrivalTime: string
) {
  const result = new Date(departureDate);

  const [depHour, depMinute] = departureTime.split(":").map(Number);
  const [arrHour, arrMinute] = arrivalTime.split(":").map(Number);

  result.setHours(arrHour, arrMinute);

  if (
    arrHour < depHour ||
    (arrHour === depHour && arrMinute < depMinute)
  ) {
    result.setDate(result.getDate() + 1);
  }

  return result;
}

type TrainProps = {
  train: {
    id: number;
    number: string;
    name: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    departureDate: string;
  arrivalDate: string;
    classes: {
      type: string;
      price: number;
      color: string;
      seats: string;
    }[];
  };
};

export default function Tiket({ train }: TrainProps) {

    const {flightData} = useFlight();
    const departureDate = flightData.departureDate;

    const arrivalDate = departureDate && getArrivalDate(
    departureDate,
    train.departureTime,
    train.arrivalTime
  );
  const formatDate = (date: Date | null | undefined) =>
    date?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="travel">
        
    <div className="train-card">
      <h2 className="name"> {train.name}</h2>
      
<p className="runs-title">Runs on</p>
<div className="runs-day">Everyday</div>

<div className="train-time">

  <div className="departure-info">
    <span>{formatDate(departureDate)}</span>
    <h3>{train.departureTime}</h3>
    <p>{train.from}</p>
  </div>

  <div className="duration">
    {train.duration}
  </div>

  <div className="arrival-info">
    <span>{formatDate(arrivalDate)}</span>
    <h3>{train.arrivalTime}</h3>
    <p>{train.to}</p>
  </div>

</div>

      <div className="classes">
        {train.classes.map((item) => (
          <button key={item.type} className={`class-card ${item.color}`}>
            <p>{item.type}</p> 
            <p className="item">{item.seats}</p>
            <p className="iten">Tatkal</p>
            <p className="item">₹{item.price}</p>
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}

