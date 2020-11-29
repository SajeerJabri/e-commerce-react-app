import React from "react";
import "./ProductItem.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { Accordion, Card } from "react-bootstrap";

const ProductItems = () => {
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.allProduct);
  const userEmail = useSelector((state) => state.userEmail);
  const { id } = useParams();

  return (
    <div className="individual__product_item">
      {allProduct.map((product, ind) =>
        product.title == id ? (
          <>
            <div className="individual__product_container">
              <div className="individual__product_left">
                <img src={product.image} alt="" />
              </div>
              <div className="individual__product_right">
                <h3>{product.title}</h3>
                <div className="individual__product_info">
                  <span>
                    Price: <strong>{product.price} Rs</strong>{" "}
                  </span>
                  <span>
                    Stock: <strong>{product.stock}</strong>{" "}
                  </span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      !userEmail
                        ? alert("You need to login ")
                        : product.stock > 0
                        ? dispatch({
                            type: "ADD_ITEM",
                            payload: {
                              _id: ind,
                              title: product.title,
                              desc: product.description,
                              imgUrl: product.image,
                              category: product.category,
                              price: product.price,
                            },
                          })
                        : alert("Product is not available ")
                    }
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="individual__product_desc">
              <h5>Description:</h5>
              <p>{product.description}</p>
            </div>
          </>
        ) : (
          ""
        )
      )}

      <div className="product__reviews">
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Reviews!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <span className="product__review_value">
                  <strong> Usman:</strong> This product is best i recommend this
                  product all user 🚀🚀 🚀
                </span>
                <br />
                <span className="product__review_value">
                  <strong> Asad:</strong> its a cheap quality 😠😠😠
                </span>
                <br />
                <span className="product__review_value">
                  <strong> Babar:</strong> good quality 😇😇😇
                </span>
                <br />
                <span className="product__review_value">
                  <strong> Fawad:</strong> best product 🙂🙂🙂
                </span>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductItems;
