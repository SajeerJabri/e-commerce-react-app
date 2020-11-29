import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import StripeCheckoutButton from "./StripeCheckoutButton";
import { auth, db } from "../firebase";

const Payment = () => {
  const baskets = useSelector((state) => state.items);
  const userEmail = useSelector((state) => state.userEmail);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().email == auth.currentUser?.email) {
          setCurrentUser(doc.data());
        }
      });
    });
  }, []);

  const totalPrice = baskets.reduce(
    (total, currentItem) => total + currentItem.price,
    0
  );

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout( <Link to="/checkout">{baskets?.length} items</Link> )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{auth.currentUser?.displayName}</p>
            <p>{userEmail}</p>
            <p>{currentUser?.address}</p>
            <p>{currentUser?.phone}</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <CheckoutProduct />
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__detail">
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: &nbsp; {value}</h3>}
                decimalScale={2}
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}
              />
              {baskets.length >= 1 ? (
                <StripeCheckoutButton price={totalPrice} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
