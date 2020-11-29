const initialState = {
  items: [],
  userEmail: "",
  gamingLaptop: [],
  macbook: [],
  infinix: [],
  samsung: [],
  iphone: [],
  tablet: [],
  casualShirts: [],
  tShirts: [],
  airConditioner: [],
  portablePlayer: [],
  soundBars: [],
  ledTv: [],
  projector: [],
  laptop: [],
  mobile: [],
  electronics: [],
  menFashion: [],
  homeAudio: [],
  videoDevices: [],
  homeAppliance: [],
  allProduct: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    case "DELETE_ITEM": {
      const index = state.items.findIndex(
        (basket) => basket._id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload}) as its not in basket!`
        );
      }
      return {
        ...state,
        items: newBasket,
      };
    }
    case "EMPTY_ITEMS": {
      return {
        ...state,
        items: [],
      };
    }
    case "ADD_Email":
      return {
        ...state,
        userEmail: action.payload,
      };
    case "DELETE_Email":
      return {
        ...state,
        userEmail: "",
      };
    // product reducer
    case "ADD_IPHONE":
      return {
        ...state,
        iphone: action.payload,
      };
    case "ADD_SAMSUNG":
      return {
        ...state,
        samsung: action.payload,
      };
    case "ADD_INFINIX":
      return {
        ...state,
        infinix: action.payload,
      };
    case "ADD_TABLET":
      return {
        ...state,
        tablet: action.payload,
      };
    case "ADD_GAMING_LAPTOP":
      return {
        ...state,
        gamingLaptop: action.payload,
      };
    case "ADD_MACBOOK":
      return {
        ...state,
        macbook: action.payload,
      };
    case "ADD_CASUAL_SHIRTS":
      return {
        ...state,
        casualShirts: action.payload,
      };
    case "ADD_T_SHIRTS":
      return {
        ...state,
        tShirts: action.payload,
      };
    case "ADD_AIR_CONDITIONER":
      return {
        ...state,
        airConditioner: action.payload,
      };
    case "ADD_PORTABLE_PLAYER":
      return {
        ...state,
        portablePlayer: action.payload,
      };
    case "ADD_SOUND_BARS":
      return {
        ...state,
        soundBars: action.payload,
      };
    case "ADD_LED_TV":
      return {
        ...state,
        ledTv: action.payload,
      };
    case "ADD_PROJECTOR":
      return {
        ...state,
        projector: action.payload,
      };
    case "ADD_LAPTOP":
      return {
        ...state,
        laptop: action.payload,
      };
    case "ADD_MOBILE":
      return {
        ...state,
        mobile: action.payload,
      };
    case "ADD_ELECTRONICS":
      return {
        ...state,
        electronics: action.payload,
      };
    case "ADD_MEN_FASHION":
      return {
        ...state,
        menFashion: action.payload,
      };
    case "ADD_HOME_AUDIO":
      return {
        ...state,
        homeAudio: action.payload,
      };
    case "ADD_VIDEO_DEVICES":
      return {
        ...state,
        videoDevices: action.payload,
      };
    case "ADD_HOME_APPLIANCE":
      return {
        ...state,
        homeAppliance: action.payload,
      };
    case "ADD_ALL_PRODUCT":
      return {
        ...state,
        allProduct: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;
