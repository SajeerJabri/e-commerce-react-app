import React, { useState } from "react";
import "./Admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const Admin = () => {
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(false);
  const [admin, setAdmin] = useState("");

  // admin logout
  const adminLogout = () => {
    auth.signOut();
    history.push("/admin/login");
  };

  // auth listener login or logout
  auth.onAuthStateChanged(function (user) {
    if (user && user.displayName == "admin") {
      // User is signed in.
      console.log(user);
      setAdmin(user.email);
      setIsLogged(true);
    } else {
      // No user is signed in.
      setIsLogged(false);
      alert("this page only for admin");
    }
  });

  return (
    <div>
      {isLogged ? (
        <>
          <div className="admin__info">
            <h3>{admin}</h3>
            <Button
              className="m-5 float-right"
              variant="primary"
              onClick={adminLogout}
            >
              Logout
            </Button>
          </div>
          <div className="user__records">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="email" placeholder="Title" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control type="email" placeholder="Price" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Category</Form.Label>
                <Form.Control as="select">
                  <option>Electronics</option>
                  <option>Grocery</option>
                  <option>Clothes</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form>
                <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Select Product Image"
                  />
                </Form.Group>
              </Form>
            </Form>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h1>Sorry You Need to Login...</h1>
          <Button
            variant="primary"
            onClick={() => history.push("/admin/login")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Admin;
