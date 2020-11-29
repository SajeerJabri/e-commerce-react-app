import React, { useState, useEffect } from "react";
import "../Category.css";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Col } from "react-bootstrap";
import { db } from "../../../firebase";

const HomeAppliance = () => {
  const dispatch = useDispatch();
  const [airConditioner, setAirConditioner] = useState([]);
  const [soundBars, setSoundBars] = useState([]);
  const [ledTv, setLedTv] = useState([]);
  const [projector, setProjector] = useState([]);
  const userEmail = useSelector(state => state.userEmail);

  // get tv home appliance air conditioner product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("homeAppliance")
      .collection("airConditioner")
      .onSnapshot(snapshot => {
        setAirConditioner(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_AIR_CONDITIONER",
    payload: airConditioner,
  });
  // console.log("air conditioner", airConditioner);

  // get tv home appliance sound bars product firebase database
  useEffect(() => {
    let unsubscribe;
    unsubscribe = db
      .collection("products")
      .doc("homeAppliance")
      .collection("soundBars")
      .onSnapshot(snapshot => {
        setSoundBars(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_SOUND_BARS",
    payload: soundBars,
  });
  // console.log("sound bars", soundBars);

  // ====================== home audio ==============
  const homeAudio = soundBars;
  dispatch({
    type: "ADD_HOME_AUDIO",
    payload: homeAudio,
  });
  // console.log("homeAudio", homeAudio);

  // get tv video devices led tv product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("homeAppliance")
      .collection("videoDevices")
      .doc("ledTv")
      .collection("ledTv")
      .onSnapshot(snapshot => {
        setLedTv(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_LED_TV",
    payload: ledTv,
  });
  // console.log("led tv", ledTv);

  // get tv video devices projector product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("products")
      .doc("homeAppliance")
      .collection("videoDevices")
      .doc("projector")
      .collection("projector")
      .onSnapshot(snapshot => {
        setProjector(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_PROJECTOR",
    payload: projector,
  });
  // console.log("projector", projector);

  // ====================== video devices ==============
  const videoDevices = ledTv.concat(projector);
  dispatch({
    type: "ADD_VIDEO_DEVICES",
    payload: videoDevices,
  });
  // console.log("videoDevices", videoDevices);

  // ====================== home appliance ==============
  const homeAppliance = videoDevices.concat(homeAudio.concat(airConditioner));
  dispatch({
    type: "ADD_HOME_APPLIANCE",
    payload: homeAppliance,
  });
  // console.log("homeAppliance", homeAppliance);

  return (
    <div className="category">
      <h4 className="my-5 mx-3">Home Appliance Category</h4>
      <div className="nav__link">
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/home-appliance/air-conditioner">
                Air Conditioner
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/home-appliance/home-audio">Home Audio</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link>
              <Link to="/category/home-appliance/video-devices">
                Video Devices
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <h4 className="my-5 mx-3">Home Appliance Items</h4>
      <div className="category__items">
        {!(homeAppliance.length >= 1) ? (
          <div className="home__loader">
            <CircularProgress />
          </div>
        ) : (
          // ============== homeAppliance ==========

          homeAppliance.map((item, ind) => (
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
                      Category: <strong>Home Appliance</strong>
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

export default HomeAppliance;
