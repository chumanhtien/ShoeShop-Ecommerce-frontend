import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useNavigate } from "react-router";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import { PAYMENT_METHOD } from "../Redux/Constants/CartConstants";
const PaymentScreen = () => {
  window.scrollTo(0, 0);
  // console.log(PAYMENT_METHOD[1])

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;


  const navigate = useNavigate();

  if(!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState(1);

  console.log(paymentMethod);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(PAYMENT_METHOD[paymentMethod - 1].name));
    navigate("/placeorder")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            {/* <div className="radio-container">
              <input 
                className="form-check-input" 
                type="radio" value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label className="form-check-label">PayPal or Credit Card</label>
            </div> */}
            {PAYMENT_METHOD.map(method => (
              <label className="radio-container" key={method.id}>
                <input 
                  className="form-check-input" 
                  type="radio" value={paymentMethod}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(method.id)}/>
                <div className="form-check-label">{method.name}</div>
              </label>
             ) )}
              
          </div>

          <button type="submit">
            {/* <Link to="/placeorder" className="text-white"> */}
              Continue
            {/* </Link> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
