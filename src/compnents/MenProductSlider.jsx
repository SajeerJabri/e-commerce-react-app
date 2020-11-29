import React from "react";
import { HomeWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Container, Card, Row, Col } from "react-bootstrap";

const MenProductSlider = ({ menFashion }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);

  // product slider
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <HomeWrapper>
      <Container className="fluid-container">
        <h2 className="m-5">Men Fashion</h2>
        <Slider {...settings}>
          {
            !(menFashion.length >= 1) ? (
              <div className="home__loader">
                <CircularProgress />
              </div>
            ) : (
              // ============== menFashion ==========
              menFashion.map((item, ind) => (
                <div className="home__product__items" key={item.title}>
                  <Col>
                    <Link
                      key={item.title}
                      className="productLinks"
                      to={`/product/${item.title}`}
                    >
                      <h3 className="product__title">
                        {item.title.slice(0, 25)}
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
                          Category: <strong>Men Fashion</strong>
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
            // =======================================
          }
        </Slider>
      </Container>
    </HomeWrapper>
  );
};

export default MenProductSlider;
