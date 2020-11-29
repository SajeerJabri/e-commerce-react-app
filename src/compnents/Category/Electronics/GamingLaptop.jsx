import React, { useState, useEffect } from "react";
import "../Category.css";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Col } from "react-bootstrap";
import { db } from "../../../firebase";

const GamingLaptop = () => {
  const dispatch = useDispatch();
  const [gamingLaptop, setGamingLaptop] = useState([]);
  const userEmail = useSelector(state => state.userEmail);

  // get electronic gaming laptop product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("laptop")
      .doc("gaming")
      .collection("gaming")
      .onSnapshot(snapshot => {
        setGamingLaptop(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_GAMING_LAPTOP",
    payload: gamingLaptop,
  });

  return (
    <div className="category">
      <h4 className="my-5 mx-3">Gaming Laptop Items</h4>
      <div className="category__items">
        {!(gamingLaptop.length >= 1) ? (
          <div className="home__loader">
            <CircularProgress />
          </div>
        ) : (
          // ============== gamingLaptop ==========

          gamingLaptop.map((item, ind) => (
            <div className="home__product__items" key={item.title}>
              <Col>
                <Link
                  key={item.title}
                  className="productLinks"
                  to={`/product/${item.title}`}
                >
                  <h3 className="product__title">{item?.title?.slice(0, 25)}</h3>

                  <img
                    className="product__img"
                    src={item.image}
                    alt="productImage"
                  />
                  <p className="product__desc">
                    {item?.description?.slice(0, 50)}...
                  </p>
                  <p className="product__price">
                    Product Stock:
                    <strong>{item.stock}</strong>
                  </p>
                  <div className="price__category">
                    <p className="product__price">
                      Price:
                      <strong>{item.price} Rs</strong>
                    </p>
                    <p className="product__price">
                      Category: <strong>Electronic</strong>
                    </p>
                  </div>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    !userEmail
                      ? alert("You need to login ")
                      : item.stock > 0
                      ? dispatch({
                          type: "ADD_ITEM",
                          payload: {
                            _id: ind,
                            title: item.title,
                            desc: item.description,
                            imgUrl: item.image,
                            category: item.category,
                            price: item.price,
                          },
                        })
                      : alert("Product is not available ")
                  }
                >
                  Add To Cart
                </Button>
              </Col>
            </div>
          ))
        )
        // ===================
        }
      </div>
    </div>
  );
};

export default GamingLaptop;
