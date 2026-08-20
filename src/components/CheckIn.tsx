import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import { useFlight } from "./FlightContext";
import procent from "../img/procent.png";
import { useNavigate } from "react-router-dom";


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

export default function CheckIn () {

     const location = useLocation();
    
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

    return (
       <div className="booking">
           
          <div className="bookingON">
           
            
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
                  onClick={() => 
                        addToCart("Extra Baggage", 500.00)
                        }>Add to Ticket</button>
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


            </div>
        </div>
    )
}
