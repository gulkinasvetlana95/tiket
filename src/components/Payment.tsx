import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import procent from "../img/procent.png";
import ReviewBooking from "./ReviewBooking";

export default function Payment() {
 const location = useLocation();
 const [coupon, setCoupon] = useState("");
const [couponApplied, setCouponApplied] = useState(false);
const [discountName, setDiscountName] = useState("");




    type Passenger = {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  age: number;
};

type CartItem = {
  type: string;
  name: string;
  price: number;
};

  const {
    subtotal ,
    train,
    selectedClass,
    passengers,
    cart,
    discount,
    baggage=0,
    riceCount=0,
    chickenCount=0,
    parathaCount=0
  } = location.state || {};


const formatDate = (date: string | undefined) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};


  return (
    <div className="payment-container">
    <div className="payment">
       <p className="payment_name">
        Pay <span className="priceRED">₹{subtotal - discount}</span> to confirm your booking
      </p>
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
                      <span className="card-navigator_data">{formatDate(train?.departureDate)}</span>
                      <h3 className="card-navigator_time">{train.departureTime}</h3>
                      <p>{train.from}</p>
                    </div>

                    <div className="duration">
                     {train.duration}
                    </div>

                   <div className="arrival-info">
                     <span className="card-navigator_data">{formatDate(train?.arrivalDate)}</span>
                     <h3 className="card-navigator_time">{train.arrivalTime}</h3>
                     <p>{train.to}</p>
                    </div>

                    </div>
                </div>
            )}
            
      <div className="info">
      <p className="info_name">Traveller Details</p>
      
      {passengers?.map(
        (passenger: Passenger, index: number) => (
          <div className="info-passenger" key={index}>
            <p >
              {passenger.fullName} 
            </p>
            <p>{passenger.age } Yrs</p>
              </div>
        )
      )}
      <div>
       {baggage > 0 && (
             <p className="info_meal"> Baggage <span> {baggage} {baggage === 1}</span> </p>
            )}

        {riceCount > 0 && (
             <p className="info_meal"> Paneer Tikka Rice Bowl - Mini <span>{riceCount}</span> </p>
            )}
           
        {chickenCount > 0 && (
             <p className="info_meal"> Grilled Tandoori Chicken with dry fruits <span>{chickenCount} </span></p>
            )}
        {parathaCount > 0 && (
             <p className="info_meal"> Aloo Paratha Curd Meal (2 pcs) <span>{parathaCount} </span></p>
            )}
       </div>
       <div>
         {passengers?.map(
        (passenger: Passenger, index: number) => (
          <div className="info_email" key={index}>
            <p>
             E-Tickets will be sent to:  
            </p>
            <p>{passenger.email}</p>
            
          </div>
        )
      )}
       </div>
       
       
      </div>
      
      </div>
      <div className="card">
                      <span className="card_span"> Offers </span>
      
                          <div className="card_sale">
                              <img className="card_sale-img" src={procent} alt="procent"/>
                              <p className="card_sale-pT">50% off up to ₹100 | Use code BOOKNOW</p>
                              <button className="card_sale-btn"
                                 
                                 disabled={couponApplied}>Apply</button>
                          </div>
      
                         <div className="card_sale">
                            <img className="card_sale-img" src={procent} alt="procent"/>
                            <p  className="card_sale-p">20% off | Use code FIRSTTIME</p>
                            <button className="card_sale-btn" 
                                
                                disabled={couponApplied}>Apply</button>
                         </div>
      
                  </div>
                  <div className="sale">
                      <div className="sale_discont">
                        <label className="sale-name" id="sale"> Apply Code </label>
                        <input className="sale-name-input" type="text" id="sale"
                         value={coupon} placeholder="Enter Code"></input>
                      </div>
                      <div className="sale_discont">
                        <span className="sale-name"> Extra Baggage </span>
                        
                        <button className="sale-name-btn"
                        >Add to Ticket</button>
                              
                      </div>
                  </div>

      
       <div className="booking_summa">
              <p className="booking_bill">Bill details</p>
                <div className="booking_BaseTicket">
                  <span>Base Ticket Fare</span>
                  <span> ₹{selectedClass?.price}</span>
                  </div>
                  <div>
                  {cart.map((item: CartItem, index: number) => (
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
    
    <Footer/>
    </div>
    
  );
};
