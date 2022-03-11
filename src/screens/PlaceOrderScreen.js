import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  //Caculate Price
  const addDemicals = (num) => {
    return (Math.round(num * 100)/ 100).toFixed(2);
  }

  cart.itemsPrice = addDemicals(
    cart.cartItems.reduce((price, item) => price + item.price*item.qty, 0)
  );
    //Shipping price: itemPrice >= $500 or number of shoes >= 3 => cost = 0 else cost = 6$
  cart.shippingPrice = addDemicals((cart.cartItems.length >= 3 || cart.itemsPrice >= 500) ? 0 : 5);
    // Tax: 6.6%
  cart.taxPrice = addDemicals(Number(0.066 * cart.itemsPrice));
    //total
  cart.totalPrice = addDemicals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));
  const placeOrderHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                <p>Pay method: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.address}, {" "}
                  {cart.shippingAddress.city}.
                  <br></br>
                  <br></br>
                  Postal Code: {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {
              cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                <>
                {
                  cart.cartItems.map((item, index) => (
                    <div className="order-product row" key={index}>
                      <div className="col-md-3 col-6">
                        <img src={item.image} alt={item.name} />
                        <h6 className="align-items-center">Price: ${item.price}</h6>
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.productId}`}>
                          <h6>{item.name}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4 className="font-bold">QUANTITY</h4>
                        <h6>{item.qty}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4 className="font-bold">SUBTOTAL</h4>
                        <h6>${(item.price * item.qty).toFixed(2)}</h6>
                      </div>
                    </div>
                  ))
                }
                </>
              )
            }

            
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>${cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>${cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {
              cart.cartItems.length === 0 ? null : (
                <button type="submit" onClick={placeOrderHandler}>
                  {/* <Link to="/order" className="text-white"> */}
                    PLACE ORDER
                  {/* </Link> */}
                </button>
              )
            }
            {/* <button type="submit" onClick={placeOrderHandler}>
              <Link to="/order" className="text-white">
                PLACE ORDER
              </Link>
            </button> */}
            {/* <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
