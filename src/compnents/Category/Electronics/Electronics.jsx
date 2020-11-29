import React, { useState, useEffect } from "react";
import "../Category.css";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Col } from "react-bootstrap";
import { db } from "../../../firebase";

const Electronics = () => {
  const [gamingLaptop, setGamingLaptop] = useState([]);
  const [macbook, setMacbook] = useState([]);
  const [infinix, setInfinix] = useState([]);
  const [samsung, setSamsung] = useState([]);
  const [iphone, setIphone] = useState([]);
  const [tablet, setTablet] = useState([]);
  const dispatch = useDispatch();
  // const electronics = useSelector(state => state.electronics);
  const userEmail = useSelector(state => state.userEmail);

  // console.log(electronics);

  // ===================================================================

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
  console.log("gaming laptop", gamingLaptop);

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
  console.log("macbook", macbook);
  // ================== laptop ===========
  const laptop = gamingLaptop.concat(macbook);
  dispatch({
    type: "ADD_LAPTOP",
    payload: laptop,
  });
  console.log("laptop", laptop);

  // get electronic mobile infinix product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("mobile")
      .doc("infinix")
      .collection("infinix")
      .onSnapshot(snapshot => {
        setInfinix(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_INFINIX",
    payload: infinix,
  });
  console.log("infinix", infinix);

  // get electronic mobile samsung product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("mobile")
      .doc("samsung")
      .collection("samsung")
      .onSnapshot(snapshot => {
        setSamsung(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_SAMSUNG",
    payload: samsung,
  });
  console.log("samsung", samsung);

  // get electronic mobile iphone product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("mobile")
      .doc("iphone")
      .collection("iphone")
      .onSnapshot(snapshot => {
        setIphone(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_IPHONE",
    payload: iphone,
  });
  console.log("iphone", iphone);

  // ================== Mobile ===========
  const mobile = infinix.concat(samsung.concat(iphone));
  dispatch({
    type: "ADD_MOBILE",
    payload: mobile,
  });
  console.log("mobile", mobile);

  // get electronic tablet product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("electronic")
      .collection("tablet")
      .onSnapshot(snapshot => {
        setTablet(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_TABLET",
    payload: tablet,
  });
  console.log("tablet", tablet);

  // ================== electronics ===========
  const electronics = laptop.concat(mobile.concat(tablet));
  dispatch({
    type: "ADD_ELECTRONICS",
    payload: electronics,
  });
  console.log("electronics", electronics);

  // =====================================================================
  return (
    <div className="category">
      <h4 className="my-5 mx-3">Electronics Category</h4>
      <div className="nav__link">
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/electronics/mobile">Mobile</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/electronics/laptop">Laptop</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/electronics/tablet">Tablet</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <h4 className="my-5 mx-3">Electronics Items</h4>
      <div className="category__items">
        {!(electronics.length >= 1) ? (
          <div className="home__loader">
            <CircularProgress />
          </div>
        ) : (
          // ============== electronics ==========

          electronics.map((item, ind) => (
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
                    {item.description?.slice(0, 50)}...
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

export default Electronics;
