import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import firebase from "firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // handle form admin form submit
  const adminSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (data.user.displayName) {
          console.log(data);
          history.push("/admin");
        } else {
          alert("this is not the admin account");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="login__form container col-md-6">
        <h2 className="text-center mt-5">Login</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={adminSubmit}>
            Login
          </Button>
          <br />
          <Link to="/admin/signup">Create New Account ?</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
