import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "./OrderHistory.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  // fetch user in database
  useEffect(() => {
    db.collection("user")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          if (doc.data().email == auth.currentUser?.email) {
            setUser({
              id: doc.id,
              user: doc.data(),
            });
          }
        });
      });
  }, []);

  console.log(user?.id);
  // fetch user order data
  useEffect(() => {
    db.collection("user")
      .doc(user?.id)
      .collection("orders")
      .onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => doc.data()));
      });
  }, [user]);
  console.log(orders);
  return (
    <div className="order__history">
      {!orders ? (
        <h3>No Orders Yet</h3>
      ) : (
        <>
          <h2>Order History</h2>
          <div className="order__history_table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Order</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((orderVal, ind) => (
                  <tr>
                    <td>{ind}</td>
                    <td>date</td>
                    <td>
                      {orderVal.order.map(prod => (
                        <>
                          <Link to={`/product/${prod}`}>
                            <span>{prod}</span>
                          </Link>
                          <br />
                          <hr />
                        </>
                      ))}
                    </td>
                    <td>
                      {orderVal.price.map(prod => (
                        <>
                          <span>{prod}</span> <br />
                          <hr />
                        </>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
