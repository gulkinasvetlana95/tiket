import { useLocation } from "react-router-dom";
import { useFlight } from "./FlightContext";
import rice from "../img/rice.jpg";
import food from "../img/food.jpg";
import capcake from "../img/capcake.jpg";
import procent from "../img/procent.png";

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

export default function ReviewBooking() {
  const location = useLocation();

  const { train, selectedClass } = location.state || {};

 
  const { flightData } = useFlight();

  const departureDate = flightData.departureDate;

 
  const arrivalDate =
    departureDate && train
      ? getArrivalDate(
          departureDate,
          train.departureTime,
          train.arrivalTime
        )
      : null;

 
  const formatDate = (date: Date | null) =>
    date?.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    return (
        <div className="booking">
            <h1 className="booking_name">Review your booking</h1>
            
            <div className="card-booking">
            {train && selectedClass && (
                <div className="card-info">

                    <p className="card_details">Boarding Details</p>
                    <div className="card-info-name">
                    <p className="card-info-number">{train.name}</p>

                    <p className="card-info-class"><span>Class</span> {selectedClass.type} &amp; Tatkal Quota</p>
                    </div>


                    <div className="card-navigator">

                     <div className="departure-info">
                      <span className="card-navigator_data">{formatDate(departureDate)}</span>
                      <h3 className="card-navigator_time">{train.departureTime}</h3>
                      <p>{train.from}</p>
                    </div>

                    <div className="duration">
                     {train.duration}
                    </div>

                   <div className="arrival-info">
                     <span className="card-navigator_data">{formatDate(arrivalDate)}</span>
                     <h3 className="card-navigator_time">{train.arrivalTime}</h3>
                     <p>{train.to}</p>
                    </div>

                    </div>
                </div>
            )}
            </div>
            <div className="data_passenger"> 
                <div className="data_info">
                 <span className="data_span">Passenger 1</span>
                 <p className="data_text">Please enter your contact info</p>
                </div>
                <div className="data_passenger-input">
                <div className="data_passenger_person">
                  <label className="data_passenger_person-info"  id="name">Full Name</label>
                  <input className="data_passenger_person-name" type="text" id="name" placeholder= "Your name"></input>

                  <label className="data_passenger_person-info" id="phone">Phone Number</label>
                  <input  className="data_passenger_person-name" type="text" id="phone" placeholder= "+91"></input>
                </div>
                <div className="data_passenger_person">
                  <label className="data_passenger_person-info" id="email">Email</label>
                  <input  className="data_passenger_person-name" type="text" id="email" placeholder= "john.doe@company.com"></input>

                  <label className="data_passenger_person-info" id="data-birthDay">Date of birth</label>
                  <input  className="data_passenger_person-name" type="data" id="data-birthDay" placeholder= "12.12.1975"></input>
                </div>
            </div>
            </div>
            <div className="container_food">
                <div className="container_img">
                  <img className="container_img-card" src={rice} alt="rice" />
                  <img className="container_img-card" src={food} alt="rice" />
                  <img className="container_img-card" src={capcake} alt="rice" />
                </div>
                <div className="container_card">
                <div className="container_card-info">
                  <span className="container_card-name">Paneer Tikka Rice Bowl - Mini</span>
                  <p className="container_card-price">₹200.00</p>
                  <button className="container_btn">Add Ticket</button>
                </div>
                <div className="container_card-info">
                  <span className="container_card-nameTwo">Grilled Tandoori Chicken with dry fruits</span>
                  <p className="container_card-price">₹500.00</p>
                  <button className="container_btn">Add Ticket</button>
                </div>
                <div className="container_card-info">
                  <span className="container_card-name">Aloo Paratha Curd Meal (2 pcs) </span>
                  <p className="container_card-price">₹120.00</p>
                  <button className="container_btn">Add Ticket</button>
               </div>
               </div>
            </div>

            <div className="view">
                <p> View More &gt; </p>
            </div>
            <div className="card">
                <span className="card_span"> Offers </span>

                    <div className="card_sale">
                        <img className="card_sale-img" src={procent} alt="procent"/>
                        <p className="card_sale-pT">50% off up to ₹100 | Use code BOOKNOW</p>
                        <button className="card_sale-btn">Apply</button>
                    </div>

                   <div className="card_sale">
                      <img className="card_sale-img" src={procent} alt="procent"/>
                      <p  className="card_sale-p">20% off | Use code FIRSTTIME</p>
                      <button className="card_sale-btn">Apply</button>
                   </div>

            </div>
            <div className="sale">
                <div className="sale_discont">
                  <label className="sale-name" id="sale"> Apply Code </label>
                  <input className="sale-name-input" type="text" id="sale" placeholder="Enter Code"></input>
                </div>
                <div className="sale_discont">
                  <span className="sale-name"> Extra Baggage </span>
                  <button className="sale-name-btn">Add to Ticket</button>
                </div>
            </div>

        </div>
    );
}