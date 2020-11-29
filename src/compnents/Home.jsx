import React, { useEffect, useState } from "react";
import "./Home.css";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { HomeWrapper } from "./style";
import { db } from "../firebase";
import ElectronicProductSlider from "./ElectronicProductSlider";
import MenProductSlider from "./MenProductSlider";
import HomeApplianceProductSlider from "./HomeApplianceProductSlider";

const Home = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.userEmail);
  const [product, setProduct] = useState([]);
  const [productStock, setProductStock] = useState();
  const [gamingLaptop, setGamingLaptop] = useState([]);
  const [macbook, setMacbook] = useState([]);
  const [infinix, setInfinix] = useState([]);
  const [samsung, setSamsung] = useState([]);
  const [iphone, setIphone] = useState([]);
  const [tablet, setTablet] = useState([]);
  const [casualShirts, setCasualShirts] = useState([]);
  const [tShirts, setTShirts] = useState([]);
  const [airConditioner, setAirConditioner] = useState([]);
  const [portablePlayer, setPortablePlayer] = useState([]);
  const [soundBars, setSoundBars] = useState([]);
  const [ledTv, setLedTv] = useState([]);
  const [projector, setProjector] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(json => setProduct(json));
  }, []);

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

  // get men fashion casual shirts product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Men Fashion")
      .doc("iaLc0QvrVnesjmt03x90")
      .collection("Casual Shirts")
      .onSnapshot(snapshot => {
        setCasualShirts(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_CASUAL_SHIRTS",
    payload: casualShirts,
  });
  // console.log("casual shirts", casualShirts);

  // get men fashion t-shirts product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Men Fashion")
      .doc("iaLc0QvrVnesjmt03x90")
      .collection("T-shirt")
      .onSnapshot(snapshot => {
        setTShirts(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_T_SHIRTS",
    payload: tShirts,
  });
  // console.log("t-shirts", tShirts);

  // ================== men fashion ===========
  const menFashion = tShirts.concat(casualShirts);
  dispatch({
    type: "ADD_MEN_FASHION",
    payload: menFashion,
  });
  // console.log("menFashion", menFashion);

  // get tv home appliance air conditioner product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Tv & Home Appliances")
      .doc("qPHcmpZ8NbGy5jYksJnQ")
      .collection("Air Conditioner")
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

  // get tv home appliance portable player product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Tv & Home Appliances")
      .doc("qPHcmpZ8NbGy5jYksJnQ")
      .collection("Home Audio")
      .doc("Ge9SgdvUv0zYXrgDALFH")
      .collection("Portable Players")
      .onSnapshot(snapshot => {
        setPortablePlayer(snapshot.docs.map(doc => doc.data()));
      });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  dispatch({
    type: "ADD_PORTABLE_PLAYER",
    payload: portablePlayer,
  });
  // console.log("portablePlayer", portablePlayer);

  // get tv home appliance sound bars product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Tv & Home Appliances")
      .doc("qPHcmpZ8NbGy5jYksJnQ")
      .collection("Home Audio")
      .doc("Ge9SgdvUv0zYXrgDALFH")
      .collection("Sound Bars")
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
  const homeAudio = portablePlayer.concat(soundBars);
  dispatch({
    type: "ADD_HOME_AUDIO",
    payload: homeAudio,
  });
  // console.log("homeAudio", homeAudio);

  // get tv video devices led tv product firebase database
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Tv & Home Appliances")
      .doc("qPHcmpZ8NbGy5jYksJnQ")
      .collection("TV & Video Devices")
      .doc("Z6s813E7DC7HcT8chMBZ")
      .collection("LED Television")
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
      .collection("product")
      .doc("RM31GhBU4fzdy4lLnVWf")
      .collection("Tv & Home Appliances")
      .doc("qPHcmpZ8NbGy5jYksJnQ")
      .collection("TV & Video Devices")
      .doc("Z6s813E7DC7HcT8chMBZ")
      .collection("Projectors")
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

  // ======================== all product ======================
  const allProduct = electronics.concat(menFashion.concat(homeAppliance));
  dispatch({
    type: "ADD_ALL_PRODUCT",
    payload: allProduct,
  });
  // console.log(allProduct);

  return (
    <div className="home">
      <div className="home__banner">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100 home__banner_img"
              src="https://www.tricasol.com/wp-content/uploads/2019/09/e-commerce-banner-1024x341.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 home__banner_img"
              src="https://www.oye.online/wp-content/uploads/2017/12/E-commerce-banner.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 home__banner_img"
              src="https://casalsonline.es/wp-content/uploads/2018/12/CASALS-ONLINE-18-DICIEMBRE.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="home__product">
        <ElectronicProductSlider
          electronics={electronics}
          mobile={mobile}
          laptop={laptop}
          tablet={tablet}
        />
        <MenProductSlider menFashion={menFashion} />
        <HomeApplianceProductSlider homeAppliance={homeAppliance} />
      </div>
    </div>
  );
};

export default Home;
