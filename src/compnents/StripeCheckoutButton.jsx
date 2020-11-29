import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import firebase from "firebase";

const StripeCheckoutButton = ({ price }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(state => state.items);
  const [user, setUser] = useState();
  const date = new Date();
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb";

  // fetch user in database
  useEffect(() => {
    db.collection("user")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          if (doc.data().email == auth.currentUser?.email) {
            setUser({
              id: doc.id,
              user: doc.data(),
            });
          }
        });
      });
  }, []);
  // add order details after buy product
  const addUserOrder = event => {
    db.collection("user")
      .doc(user.id)
      .collection("orders")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date: date,
        order: items.map(prod => prod.title),
        price: items.map(prod => prod.price),
      });
  };

  console.log(user);
  // after payment successfull
  const onToken = token => {
    console.log(token);
    addUserOrder();
    dispatch({
      type: "EMPTY_ITEMS",
    });
    alert("Payment Succesful! ThankYou");
    history.push("/");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Freaky Jolly Co."
      billingAddress
      shippingAddress
      image="https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
