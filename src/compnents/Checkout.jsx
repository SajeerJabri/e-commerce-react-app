import React from "react";
import "./Checkout.css";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const checkoutData = useSelector((state) => state.items);
  const dispatch = useDispatch();
  return (
    <div className="checkout">
      {checkoutData.length >= 1 ? (
        <>
          <h1>Checkout Page</h1>
          <div className="checkout__container">
            <div className="checkout__left">
              <CheckoutProduct />
            </div>
            <div className="checkout__right">
              <Subtotal />
            </div>
          </div>
        </>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};

export default Checkout;
