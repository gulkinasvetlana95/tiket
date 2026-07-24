import user from "../img/user.png"
import {useFlight} from "./FlightContext"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Tiket from "./tiket";
import {trains} from "../data/trains";

export default function Flights() {
const { flightData, setFlightData } = useFlight();
 const filteredTrains = trains.filter(
  (train) =>
    train.from === flightData.departure &&
    train.to === flightData.arrival
);
const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState("one-way");
    const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
const handleTicket = () => {
  setFlightData({
    departure,
    arrival,
    passengers,
    tripType,
    departureDate,
    returnDate
  });



};
  return (
     
    <main className="flight">
      <svg className="train" width="73" height="39" viewBox="0 0 73 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M17.1055 3.50592L12.8214 4.20892C10.2274 5.06342 9.05731 8.31779 8.27106 10.6328C7.64578 12.4751 7.12574 14.366 6.62428 16.2386C6.01138 18.5536 5.42324 20.8747 4.81653 23.1897L0 34.0073C2.20397 39.6919 9.42257 39.2859 14.5796 38.6435C17.477 38.2799 20.3805 37.6799 23.2035 36.9526C24.5098 36.6193 25.8409 36.2557 27.1286 35.8376L28.0572 35.5345C28.0572 34.2619 28.0572 33.1771 28.3668 31.9105L28.6887 31.8317L65.2894 23.1231L45.4165 26.535C46.2461 25.3411 46.9581 24.0624 47.5524 22.7231L66.8681 19.3596L33.8457 23.3534L42.253 20.1778L67.1962 17.6809L42.8102 21.1292L40.761 22.517L33.8519 23.3534C33.8519 23.3534 26.7138 26.5168 26.7138 34.577C26.7138 34.577 25.8347 34.8558 24.3984 35.2376L22.4297 27.4501L23.2964 35.5224C22.6711 35.68 21.9839 35.8497 21.2472 36.0133L19.6438 27.6743L19.8666 36.3103C19.1795 36.4557 18.4613 36.589 17.7246 36.7224L16.6783 28.038L16.5917 36.9102C15.7497 37.0436 14.8891 37.1587 14.0224 37.2496L13.7067 28.1289L12.9947 37.3466C11.998 37.4314 11.0074 37.4738 10.054 37.4678L11.2056 28.0804L9.08826 37.4435C7.96771 37.395 6.90906 37.2678 5.95566 37.0375L8.46917 28.2622L5.00226 36.7587C4.30888 36.5224 3.68979 36.2194 3.16356 35.8376L6.28378 26.6683L2.55685 35.3224C2.12967 34.8982 1.79537 34.4013 1.57249 33.8195L6.11662 23.614L6.32092 22.8382L9.41019 27.3895L23.544 25.9956L28.3977 17.0204L32.7747 16.6204L30.5522 14.372L41.1882 14.8629L67.9267 14.4205L48.9825 14.1478L26.7076 12.7782L29.1654 15.2689L26.9367 15.4447L22.4297 24.3957L20.1143 24.5412L23.2778 11.4691L15.954 7.6451L10.5741 10.3662L7.75103 21.7716L6.90287 20.5838C9.12541 11.9661 10.5741 6.34214 13.1681 5.48764C19.9719 4.36648 23.3336 4.04529 31.5613 5.9361C32.1494 4.95433 32.0813 3.48774 32.0813 3.48774L34.4462 4.11195C29.834 1.89389 25.1413 1.77268 21.2782 2.46961L21.1544 2.53022C21.792 2.22114 22.4668 1.94237 23.1726 1.71208C26.9181 0.87576 31.9451 1.7848 36.4026 3.20897L74 6.97241L36.805 1.94843C29.314 -0.421142 23.2964 -1.38473 17.1117 3.50592H17.1055ZM18.2199 24.6745L20.4672 12.9236L15.2235 9.89953L11.3851 12.0146L8.52489 22.8807L10.1655 25.1714L18.2261 24.6684L18.2199 24.6745ZM38.0122 5.19068L35.734 4.65738C35.412 4.57859 35.1025 4.62708 34.8239 4.79676C34.5391 4.96645 34.341 5.20886 34.2853 5.53006L33.7776 8.31173C33.6786 8.84504 33.7405 9.34804 34.05 9.7965C34.3596 10.251 34.7991 10.5237 35.3501 10.6086L38.0184 11.0207V5.19068H38.0122ZM39.2256 9.91771V10.851L68.7811 11.8812L39.2256 9.91771ZM71.8827 9.15411L39.2256 5.78459V6.71788L71.8827 9.15411ZM70.0378 10.2995L39.2256 7.85115V8.78443L70.0378 10.3056V10.2995ZM45.8128 23.0685C45.1441 24.42 44.327 25.6987 43.3859 26.8926L29.605 30.1712C30.4407 27.9592 32.3475 25.826 34.471 24.6987L45.8128 23.0685Z" fill="white"/>
</svg>
      <div className="fly_ticket">
        <span className="fly_ticket-title">Search Results</span>
      </div>

      <div className="ticket_form">
        <label>
          <input type="radio" checked={flightData.tripType === "round-trip"} readOnly/>Round trip</label>

        <label>
          <input type="radio" checked={flightData.tripType === "one-way"} readOnly/>One way</label>

        <div className="passengers">
          <img className="passenger_icon" src={user} alt="user" />
          <span className="person">{flightData.passengers}</span>
        </div>
      </div>

      <div className="sending">
        <div className="departure">
          <label className="city-depart label">Departure</label>

              <input className="city" value={flightData.departure}
                 onChange={(e) =>
                 setFlightData({...flightData, departure: e.target.value })
                }/>

          <label className="PickDay" htmlFor="departureDate">Pick your lucky day</label>

          <DatePicker className="city-input" selected={flightData.departureDate} onChange={(date : Date | null) => setFlightData({...flightData,departureDate: date})} dateFormat="d MMMM" placeholderText="Departure"/>
           </div>

        <div className="arrival">
          <label className="city-depart label">Arrival</label>
          <input className="city" value={flightData.arrival}
             onChange={(e) =>
             setFlightData({...flightData, arrival: e.target.value})
          }/>

          {flightData.tripType === "round-trip" && (<></>)}
          <label htmlFor="returnDate"></label>

         <DatePicker className="city-input bottom" selected={flightData.returnDate} onChange={(date : Date | null) => setFlightData({ ...flightData, returnDate: date})} dateFormat="d MMMM" placeholderText="Return" disabled={flightData.tripType === "one-way"} minDate={flightData.departureDate ?? undefined}/>
        </div>
        
      </div>
       <button className="button-passanger" onClick={handleTicket}> Tiket, Please! </button>
       <div className="picture">
        <span className="picture-span">Planning your holidays</span>
        </div>
          <div className="pictureTwo">
           <span className="picture-span">Planning your holidays</span>
          </div>
          <div className= "text">
            <p className="text-India">Our trains don't just transport people, they transport emotions and stories! 
              From the mountains of Darjeeling to the beaches of Goa, we connect more than just stations. As Raj Koothrappali would say, 
              "In India, we don't just ride trains, we experience cosmic journeys with occasional cow delays." Book now and embrace the colorful chaos!</p>
            <p className="name_title">Available Trains</p>
          </div>

     <div className="train-list">
      {filteredTrains.map((train) => (
        <Tiket key={train.id} train={train} />
      ))}
    </div>

    
    <div className="footer">
      <div className="footer_container">

        <div className="footer_logo">
          <svg width="73" height="50" viewBox="0 0 73 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6546_151)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1055 4.50592L12.8214 5.20892C10.2274 6.06342 9.05731 9.31779 8.27106 11.6328C7.64578 13.4751 7.12574 15.366 6.62428 17.2386C6.01138 19.5536 5.42324 21.8747 4.81653 24.1897L0 35.0073C2.20397 40.6919 9.42257 40.2859 14.5796 39.6435C17.477 39.2799 20.3805 38.6799 23.2035 37.9526C24.5098 37.6193 25.8409 37.2557 27.1286 36.8376L28.0572 36.5345C28.0572 35.2619 28.0572 34.1771 28.3668 32.9105L28.6887 32.8317L65.2894 24.1231L45.4165 27.535C46.2461 26.3411 46.9581 25.0624 47.5524 23.7231L66.8681 20.3596L33.8457 24.3534L42.253 21.1778L67.1962 18.6809L42.8102 22.1292L40.761 23.517L33.8519 24.3534C33.8519 24.3534 26.7138 27.5168 26.7138 35.577C26.7138 35.577 25.8347 35.8558 24.3984 36.2376L22.4297 28.4501L23.2964 36.5224C22.6711 36.68 21.9839 36.8497 21.2472 37.0133L19.6438 28.6743L19.8666 37.3103C19.1795 37.4557 18.4613 37.589 17.7246 37.7224L16.6783 29.038L16.5917 37.9102C15.7497 38.0436 14.8891 38.1587 14.0224 38.2496L13.7067 29.1289L12.9947 38.3466C11.998 38.4314 11.0074 38.4738 10.054 38.4678L11.2056 29.0804L9.08826 38.4435C7.96771 38.395 6.90906 38.2678 5.95566 38.0375L8.46917 29.2622L5.00226 37.7587C4.30888 37.5224 3.68979 37.2194 3.16356 36.8376L6.28378 27.6683L2.55685 36.3224C2.12967 35.8982 1.79537 35.4013 1.57249 34.8195L6.11662 24.614L6.32092 23.8382L9.41019 28.3895L23.544 26.9956L28.3977 18.0204L32.7747 17.6204L30.5522 15.372L41.1882 15.8629L67.9267 15.4205L48.9825 15.1478L26.7076 13.7782L29.1654 16.2689L26.9367 16.4447L22.4297 25.3957L20.1143 25.5412L23.2778 12.4691L15.954 8.6451L10.5741 11.3662L7.75103 22.7716L6.90287 21.5838C9.12541 12.9661 10.5741 7.34214 13.1681 6.48764C19.9719 5.36648 23.3336 5.04529 31.5613 6.9361C32.1494 5.95433 32.0813 4.48774 32.0813 4.48774L34.4462 5.11195C29.834 2.89389 25.1413 2.77268 21.2782 3.46961L21.1544 3.53022C21.792 3.22114 22.4668 2.94237 23.1726 2.71208C26.9181 1.87576 31.9451 2.7848 36.4026 4.20897L74 7.97241L36.805 2.94843C29.314 0.578858 23.2964 -0.384727 17.1117 4.50592H17.1055ZM18.2199 25.6745L20.4672 13.9236L15.2235 10.8995L11.3851 13.0146L8.52489 23.8807L10.1655 26.1714L18.2261 25.6684L18.2199 25.6745ZM38.0122 6.19068L35.734 5.65738C35.412 5.57859 35.1025 5.62708 34.8239 5.79676C34.5391 5.96645 34.341 6.20886 34.2853 6.53006L33.7776 9.31173C33.6786 9.84504 33.7405 10.348 34.05 10.7965C34.3596 11.251 34.7991 11.5237 35.3501 11.6086L38.0184 12.0207V6.19068H38.0122ZM39.2256 10.9177V11.851L68.7811 12.8812L39.2256 10.9177ZM71.8827 10.1541L39.2256 6.78459V7.71788L71.8827 10.1541ZM70.0378 11.2995L39.2256 8.85115V9.78443L70.0378 11.3056V11.2995ZM45.8128 24.0685C45.1441 25.42 44.327 26.6987 43.3859 27.8926L29.605 31.1712C30.4407 28.9592 32.3475 26.826 34.471 25.6987L45.8128 24.0685Z" fill="white"/>
          </g></svg>
         <p className="footer_name">Railway</p>
        </div>

        <div className="footer_info">

          <nav className="footer_list">

            <ul className="footer_about">About
             <li className="footer_about-li"> How it works</li>
             <li className="footer_about-li">Featured</li>
             <li className="footer_about-li">Partnership</li>
             <li className="footer_about-li">Bussiness Relation</li>
           </ul>
           <ul className="footer_about">Community
             <li className="footer_about-li"> Events</li>
             <li className="footer_about-li">Blog</li>
             <li className="footer_about-li">Podcast</li>
             <li className="footer_about-li">Invite a friend</li>
           </ul>
           <ul className="footer_about">Social
             <li className="footer_about-li">Discord</li>
             <li className="footer_about-li">Instagram</li>
             <li className="footer_about-li">Twitter</li>
             <li className="footer_about-li">Facebook</li>
           </ul>

         </nav>

      </div>
      </div>
       <div className="rights">
          <p>&copy; 2025 RailWay.  All rights reserved</p>
       </div>
    </div>

    

    </main>
   
  );
}