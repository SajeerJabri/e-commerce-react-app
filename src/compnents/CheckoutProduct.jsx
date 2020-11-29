import React from "react";
import "./Checkout.css";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Subtotal from "./Subtotal";

const CheckoutProduct = () => {
  const checkoutData = useSelector((state) => state.items);
  const dispatch = useDispatch();
  console.log(checkoutData);
  return (
    <div className="checkout__product">
      {checkoutData.map((data, ind) => (
        <div className="checkout__items" key={ind}>
          <div className="img__container">
            <h6 className="checkout__title">{data.title}</h6>
            <img
              className="checkout__img"
              src={data.imgUrl}
              alt="productImage"
            />
          </div>
          <div className="checkout__info">
            <p className="checkout__desc">
              Category: <strong>{data.category}</strong>{" "}
            </p>
            <p className="checkout__price">
              Price:
              <strong>{data.price} Rs</strong>
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch({
                  type: "DELETE_ITEM",
                  payload: data._id,
                })
              }
            >
              Remove Item
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutProduct;
