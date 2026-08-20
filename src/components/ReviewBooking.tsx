import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import { useFlight } from "./FlightContext";
import rice from "../img/rice.jpg";
import food from "../img/food.jpg";
import capcake from "../img/capcake.jpg";
import procent from "../img/procent.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const [showError, setShowError] = useState(false);

  const { train, selectedClass } = location.state || {};
 
  const { flightData } = useFlight();

  const passengerCount = flightData.passengers;

  const [cart, setCart] = useState<
  { name: string; price: number }[]
>([]);

const addToCart = (name: string, price: number) => {
  setCart(prev => [...prev, { name, price }]);
};




 const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(0);
const [couponApplied, setCouponApplied] = useState(false);
const [discountName, setDiscountName] = useState("");
const [Baggage, setBaggage] = useState(0);
const[riceCount, setRiceCount] = useState(0);
const[chickenCount, setChickenCount] = useState(0);
const[parathaCount, setParathaCount] = useState(0);

  const [passengers, setPassengers] = useState(
  Array.from({ length: flightData.passengers }, () => ({
    fullName: "",
    phone: "",
    email: "",
    birthDate: "",
  }))
);

    const handlePassengerChange = (
  index: number,
  field: "fullName" | "phone" | "email" | "birthDate",
  value: string
) => {
  setPassengers((prev) => {
    const updated = [...prev];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    return updated;
  });
};


useEffect(() => {
  setPassengers(
    Array.from({ length: passengerCount }, () => ({
      fullName: "",
      phone: "",
      email: "",
      birthDate: "",
    }))
  );
}, [passengerCount]);

 const Passengers = flightData.passengers ?? 1;

const subtotal =
  (selectedClass?.price ?? 0) * Passengers +
  cart.reduce((sum, item) => sum + item.price, 0);

const applyCoupon = (code: string) => {
  if (couponApplied) return;

  if (code === "BOOKNOW") {
    setDiscount(Math.min(subtotal * 0.5, 100));
    setDiscountName("BOOKNOW");
  } else if (code === "FIRSTTIME") {
    setDiscount(subtotal * 0.2);
    setDiscountName("FIRSTTIME");
  }

  setCouponApplied(true);
};
const applyPromoCode = () => {
  if (couponApplied) return;

  if (coupon.toUpperCase() === "SVETIK") {
    setDiscount(subtotal * 0.1);
    setDiscountName("SVETIK");
    setCouponApplied(true);
  } else {
    alert("Invalid promo code");
  }
}

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


    
   const Cancel = () => {
  setCart([]);
  setCoupon("");
  setDiscount(0);
  setCouponApplied(false);
  setDiscountName("");

  setPassengers(
    Array.from({ length: passengerCount }, () => ({
      fullName: "",
      phone: "",
      email: "",
      birthDate: "",
      age: "",
    }))
  );
};
const navigate = useNavigate();
const calculateAge = (birthDate: string) => {
  if (!birthDate) return "";

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
};
const handleBooking = () => {
  const emptyPassenger = passengers.findIndex(
    (passenger) =>
      !passenger.fullName.trim() ||
      !passenger.phone.trim() ||
      !passenger.email.trim() ||
      !passenger.birthDate
  );

  if (emptyPassenger !== -1) {
    setShowError(true);
    return;
  }

const passengersWithAge = passengers.map((passenger) => ({
  ...passenger,
  age: calculateAge(passenger.birthDate),
}));

  navigate("/Payment", {
    state: {
      train,
      selectedClass,
      passengers: passengersWithAge,
      cart,
      discount,
      discountName,
       subtotal,
       baggage: Baggage,
       riceCount,
       chickenCount,
       parathaCount
       
    },
  });
}

    return (
        <div className="booking">
           
          <div className="bookingON">
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
           
            {Array.from({ length: passengerCount }).map((_, index) => (
            <div className="data_passenger" key={index}> 
                <div className="data_info">
                 <span className="data_span">Passenger {index + 1}</span>
                 <p className="data_text">Please enter your contact info</p>
                </div>
                <div className="data_passenger-input">
                <div className="data_passenger_person">
                  <label className="data_passenger_person-info"  id="name">Full Name</label>
                  <input className="data_passenger_person-name" type="text" id="name" value={passengers[index].fullName} onChange={(e) => handlePassengerChange(index, "fullName", e.target.value)} placeholder= "Your name"  required></input>

                  <label className="data_passenger_person-info" id="phone">Phone Number</label>
                  <input  className="data_passenger_person-name" type="text" id="phone"   value={passengers[index].phone}
                      onChange={(e) => {
                       let value = e.target.value;

                        if (value && value[0] !== "+") {
                         value = "+" + value;
                        }

                       value ="+" + value
                       .slice(1)
                       .replace(/\D/g, "");

                       handlePassengerChange(index, "phone", value); }} placeholder="+91" required></input>
                </div>
                <div className="data_passenger_person">
                 <label className="data_passenger_person-info"> Email </label>

                <input className="data_passenger_person-name" type="email" value={passengers[index].email}  onChange={(e) =>
                   handlePassengerChange(index, "email", e.target.value) } placeholder="john.doe@company.com" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required/>
                  <p className="data_nameBirth">Birth Date</p>
                 <DatePicker calendarClassName="my-calendar" className="data_birthDate" selected={ passengers[index].birthDate ? new Date(passengers[index].birthDate): null}
                    onChange={(date: Date | null) => {
                     handlePassengerChange(
                       index,
                       "birthDate",
                        date ? date.toISOString().split("T")[0] : "" );
                     }} 
                     maxDate={new Date()} dateFormat="dd/MM/yyyy" placeholderText="Date of birth" showYearDropdown showMonthDropdown scrollableYearDropdown yearDropdownItemNumber={100}/>
                </div>
            </div>
            </div>
            ))}
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
                  <button className="container_btn" 
                         onClick={() => {
                          setRiceCount(prev => prev + 1);
                           addToCart("Paneer Tikka Rice Bowl - Mini", 200.00)
                          }}>Add Ticket</button>
                </div>
                <div className="container_card-info">
                  <span className="container_card-nameTwo">Grilled Tandoori Chicken with dry fruits</span>
                  <p className="container_card-price">₹500.00</p>
                  <button className="container_btn"
                       onClick={()=>{
                        setChickenCount(prev => prev + 1);
                        addToCart("Grilled Tandoori Chicken with dry fruits", 500.00)
                       }}>Add Ticket</button>
                </div>
                <div className="container_card-info">
                  <span className="container_card-name">Aloo Paratha Curd Meal (2 pcs) </span>
                  <p className="container_card-price">₹120.00</p>
                  <button className="container_btn"  
                       onClick={() => {

                        setParathaCount(prev => prev + 1);
                        addToCart("Aloo Paratha Curd Meal", 120.00)
                        }}> Add Ticket</button>
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
                        <button className="card_sale-btn"
                           onClick={() => applyCoupon("BOOKNOW")}
                           disabled={couponApplied}>Apply</button>
                    </div>

                   <div className="card_sale">
                      <img className="card_sale-img" src={procent} alt="procent"/>
                      <p  className="card_sale-p">20% off | Use code FIRSTTIME</p>
                      <button className="card_sale-btn" 
                          onClick={() => applyCoupon("FIRSTTIME")}
                          disabled={couponApplied}>Apply</button>
                   </div>

            </div>
            <div className="sale">
                <div className="sale_discont">
                  <label className="sale-name" id="sale"> Apply Code </label>
                  <input className="sale-name-input" type="text" id="sale"
                   value={coupon}
                   onChange={(e) => setCoupon(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === "Enter") {
                     applyPromoCode();
                    }
                  }} placeholder="Enter Code"></input>
                </div>
                <div className="sale_discont">
                  <span className="sale-name"> Extra Baggage </span>
                  
                  <button className="sale-name-btn"
                  onClick={() => {
                        setBaggage(prev => prev + 1);
                        addToCart("Extra Baggage", 500.00)
                        }}>Add to Ticket</button>
                        
                </div>
            </div>

            <div className="booking_summa">
              <p className="booking_bill">Bill details</p>
                <div className="booking_BaseTicket">
                  <span>Base Ticket Fare</span>
                  <span> ₹{selectedClass?.price}</span>
                  </div>
                  <div>
                  {cart.map((item, index) => (
                   <div className="booking_BaseTicket" key={index}>
                     <span>{item.name}</span>
                     <span>₹{item.price}</span>
                   </div>
                  ))}
                </div>
                {discount > 0 && (
                   <div className="booking_BaseTicket">
                     <span> <strong>Discount</strong></span>
                     <span><strong>-₹{discount.toFixed(2)}</strong></span>
                  </div>
                )}
                 <div className="booking_bill">
                   <strong>Total Charge</strong>
                   <strong>₹{subtotal - discount}</strong>
                   </div>

            </div>
           

             <div className="Button">
              <p className="Button_text">Discounts, offers and price concessions will be applied later during payment</p>
              <button className="Button_book" type="submit" onClick ={handleBooking}> Book Now</button>

              

              
              <button className="Button_cancel"
                    onClick={Cancel}>Cancel</button>
                <ul className="Button_ul">
                  <li>Cancellation Policy</li>
                  <li>Tems & Conditions</li>
                  <li>Travel Insurance</li>
                </ul>
                </div>
 {showError && (
  <div className="modal_overlay">
    <div className="modal">
      <div className="modal_content">
      <h2 className="modal_title">Important message</h2>

      <p className="modal_text" >
        Please, fill in all information for Passenger{" "}
        {passengers.findIndex(
          (passenger) =>
            !passenger.fullName.trim() ||
            !passenger.phone.trim() ||
            !passenger.email.trim() ||
            !passenger.birthDate
        ) + 1}
      </p>

      <button onClick={() => setShowError(false)}>
        OK
      </button>
      </div>
    </div>
  </div>
)}

            </div>
           
            < Footer />
        </div>
        
    );
    
}
