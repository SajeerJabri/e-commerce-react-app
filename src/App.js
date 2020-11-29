import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./compnents/Header";
import About from "./compnents/About";
import Checkout from "./compnents/Checkout";
import Home from "./compnents/Home";
import Login from "./compnents/Login";
import SignUp from "./compnents/SignUp";
import Admin from "./compnents/Admin/Admin";
import AdminSignUp from "./compnents/Admin/AdminSignUp";
import AdminLogin from "./compnents/Admin/AdminLogin";
import Payment from "./compnents/Payment";
import ProductItems from "./compnents/ProductItems";
import EmailVarification from "./compnents/EmailVarification";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Button from "@material-ui/core/Button";
import Electronics from "./compnents/Category/Electronics/Electronics";
import Mobile from "./compnents/Category/Electronics/Mobile";
import Iphone from "./compnents/Category/Electronics/Iphone";
import Samsung from "./compnents/Category/Electronics/Samsung";
import Infinix from "./compnents/Category/Electronics/Infinix";
import Laptop from "./compnents/Category/Electronics/Laptop";
import Macbook from "./compnents/Category/Electronics/Macbook";
import GamingLaptop from "./compnents/Category/Electronics/GamingLaptop";
import Tablet from "./compnents/Category/Electronics/Tablet";
import MenFashion from "./compnents/Category/MenFashion/MenFashion";
import CasualShirts from "./compnents/Category/MenFashion/CasualShirts";
import TShirts from "./compnents/Category/MenFashion/TShirts";
import HomeAppliance from "./compnents/Category/HomeAppliance/HomeAppliance";
import Projector from "./compnents/Category/HomeAppliance/Projector";
import LedTv from "./compnents/Category/HomeAppliance/LedTv";
import AirConditioner from "./compnents/Category/HomeAppliance/AirConditioner";
import HomeAudio from "./compnents/Category/HomeAppliance/HomeAudio";
import VideoDevices from "./compnents/Category/HomeAppliance/VideoDevices";
import OrderHistory from "./compnents/OrderHistory";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HrLDuKkQWC3ZaF63F50kduCl4JQSJLmqp1Gjvlmg2QQjehtV7FIr3Fy5B4FwfeZYS4i7D4moy5PUGBUVGKYZkvV00MBTKvmk1"
);
function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.userEmail);
  const history = useHistory();
  const [isVarified, setIsVarified] = useState(false);
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      setIsVarified(user.emailVerified);
      dispatch({
        type: "ADD_Email",
        payload: user.email,
      });
    } else {
      // No user is signed in.
    }
  });
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/admin/signup">
              <AdminSignUp />
            </Route>
            <Route exact path="/admin/login">
              <AdminLogin />
            </Route>
            <div>
              <Header />

              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/Checkout">
                {userEmail && isVarified ? (
                  <Checkout />
                ) : userEmail ? (
                  <div className="varified-btn">
                    <h3>Your Account is not Varified</h3>
                    <Link to="/email-varification">Varify Account</Link>
                  </div>
                ) : (
                  <h2 className="checkout__Logout">Sorry You Need To Login</h2>
                )}
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/email-varification">
                <EmailVarification />
              </Route>
              <Route path="/payment">
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </Route>
              <Route exact path="/product/:id">
                <ProductItems />
              </Route>
              {/* product category */}
              <Route exact path="/category/electronics/mobile">
                <Mobile />
              </Route>
              <Route exact path="/category/electronics/laptop">
                <Laptop />
              </Route>
              <Route exact path="/category/electronics/tablet">
                <Tablet />
              </Route>
              <Route exact path="/category/men-fashion/casual-shirts/">
                <CasualShirts />
              </Route>
              <Route exact path="/category/men-fashion/t-shirts/">
                <TShirts />
              </Route>
              <Route exact path="/category/home-appliance/air-conditioner/">
                <AirConditioner />
              </Route>
              <Route exact path="/category/home-appliance/home-audio/">
                <HomeAudio />
              </Route>
              <Route exact path="/category/home-appliance/video-devices/">
                <VideoDevices />
              </Route>
              <Route exact path="/category/electronics/">
                <Electronics />
              </Route>
              <Route exact path="/category/home-appliance/">
                <HomeAppliance />
              </Route>
              <Route exact path="/category/men-fashion/">
                <MenFashion />
              </Route>
              <Route exact path="/category/electronics/mobile/iphone">
                <Iphone />
              </Route>
              <Route exact path="/category/electronics/mobile/samsung">
                <Samsung />
              </Route>
              <Route exact path="/category/electronics/mobile/infinix">
                <Infinix />
              </Route>
              <Route exact path="/category/electronics/laptop/macbook">
                <Macbook />
              </Route>
              <Route exact path="/category/electronics/laptop/gaming-laptop">
                <GamingLaptop />
              </Route>
              <Route
                exact
                path="/category/home-appliance/video-devices/projector"
              >
                <Projector />
              </Route>
              <Route exact path="/category/home-appliance/video-devices/led-tv">
                <LedTv />
              </Route>
              <Route exact path="/order-history">
                <OrderHistory />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
