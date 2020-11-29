import React, { useState, useEffect } from "react";
import "../Category.css";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Col } from "react-bootstrap";
import { db } from "../../../firebase";

const Laptop = () => {
  const [gamingLaptop, setGamingLaptop] = useState([]);
  const [macbook, setMacbook] = useState([]);
  const dispatch = useDispatch();
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
  // console.log("gaming laptop", gamingLaptop);

  // get electronic macbook laptop product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("laptop")
      .doc("macbook")
      .collection("macbook")
      .onSnapshot(snapshot => {
        setMacbook(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_MACBOOK",
    payload: macbook,
  });
  // console.log("macbook", macbook);
  // ================== laptop ===========
  const laptop = gamingLaptop.concat(macbook);
  dispatch({
    type: "ADD_LAPTOP",
    payload: laptop,
  });
  // console.log("laptop", laptop);

  return (
    <div className="category">
      <h4 className="my-5 mx-3">Laptop Category</h4>
      <div className="nav__link">
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/electronics/laptop/gaming-laptop">
                Gaming Laptop
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/electronics/laptop/macbook">MacBook</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <h4 className="my-5 mx-3">Laptop Items</h4>
      <div className="category__items">
        {!(laptop.length >= 1) ? (
          <div className="home__loader">
            <CircularProgress />
          </div>
        ) : (
          // ============== electronics ==========

          laptop.map((item, ind) => (
            <div className="home__product__items" key={item.title}>
              <Col>
                <Link
                  key={item.title}
                  className="productLinks"
                  to={`/product/${item.title}`}
                >
                  <h3 className="product__title">
                    {item?.title?.slice(0, 25)}
                  </h3>

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

export default Laptop;
