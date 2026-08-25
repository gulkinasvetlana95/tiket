import { useState } from "react";
import NameCard from "../img/nameCard.png";
import logo_mastercard from "../img/pngwing.com.png";

export default function PayMethod () {
const [paymentMethod, setPaymentMethod] = useState("card");

return(
    <div className="payment-method">

  <h2>Payment Method</h2>
  <p>Please enter your payment method</p>

  <div
    className={`payment-option ${
      paymentMethod === "card" ? "active" : ""}`
    }>

    <label className="payment-option-header">
      <input
        type="radio"
        name="payment"
        value="card"
        checked={paymentMethod === "card"}
        onChange={() => setPaymentMethod("card")}
      />

      <span>Credit Card</span>

       <div className="card-logos">
  <img className="card-logos-img" src={NameCard} alt="Visa" />
  <img className="card-logos-img" src={logo_mastercard} alt="Mastercard" />
</div>
    </label>


   
    {paymentMethod === "card" && (
      <div className="card-form">

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="form-group">
          <label>Expiration Date</label>
          <input
            type="text"
            placeholder="MM / YY"
          />
        </div>

        <div className="form-group">
          <label>Cardholder</label>
          <input
            type="text"
            placeholder="Cardholder name"
          />
        </div>

        <div className="form-group">
          <label>CVC</label>
          <input
            type="text"
            placeholder="CVC"
          />
        </div>

      </div>
    )}

  </div>

<div
  className={`payment-option ${
    paymentMethod === "paypal" ? "active" : ""
  }`}
>
  <label className="payment-option-header">
    <input
      type="radio"
      name="payment"
      value="paypal"
      checked={paymentMethod === "paypal"}
      onChange={() => setPaymentMethod("paypal")}
    />

    <span>PayPal</span>

    <div className="payment-logo paypal-logo">
      PayPal
    </div>
  </label>

  {paymentMethod === "paypal" && (
    <div className="paypal-form">

      <div className="form-group">
        <label>PayPal Email</label>

        <input
          type="email"
          placeholder="example@email.com"
        />
      </div>

      <div className="form-group">
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your PayPal password"
        />
      </div>

      <p className="payment-info">
        You will be securely redirected to PayPal to complete your payment.
      </p>

    </div>
  )}
</div>

<div
  className={`payment-option ${
    paymentMethod === "bitcoin" ? "active" : ""
  }`}
>
  <label className="payment-option-header">
    <input
      type="radio"
      name="payment"
      value="bitcoin"
      checked={paymentMethod === "bitcoin"}
      onChange={() => setPaymentMethod("bitcoin")}
    />

    <span>Bitcoin</span>

    <div className="payment-logo bitcoin-logo">
      ₿
    </div>
  </label>

  {paymentMethod === "bitcoin" && (
    <div className="bitcoin-form">

      <div className="form-group">
        <label>Bitcoin Wallet Address</label>

        <input
          type="text"
          placeholder="Enter your Bitcoin wallet address"
        />
      </div>

      <div className="form-group">
        <label>Amount</label>

        <input
          type="text"
          placeholder="0.00000000 BTC"
        />
      </div>

      <div className="bitcoin-info">
        <span className="bitcoin-icon">₿</span>

        <div>
          <strong>Bitcoin payment</strong>

          <p>
            After clicking "Book Now", you will receive
            instructions to complete your Bitcoin payment.
          </p>
        </div>
      </div>

    </div>
  )}
</div>
<div className="BTN">
  <svg
    className="BTN_icon"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L20 6V11C20 16 16.5 19.5 12 21C7.5 19.5 4 16 4 11V6L12 3Z"
      stroke="#555"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <path
      d="M8.5 12L11 14.5L16 9.5"
      stroke="#3159b7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  < p className="BTN_safe">
   All your data are safe
  </p>
  </div>
  <div>
    <p className="BTN_text">Discounts, offers and price concessions will be applied later during payment</p>
  </div>
  
  
  <div>
  <button className="Button_book">Book Now</button>
  <button className="Button_cancel">Cancel</button>
</div>

</div>
)
}