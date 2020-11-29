import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // handle form admin form submit
  const adminSubmit = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        history.push("/admin");
        return data.user.updateProfile({
          displayName: "admin",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="signUp">
      <div className="login__form container col-md-6">
        <h2 className="text-center mt-5">Sign Up</h2>
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
            Sign Up
          </Button>
          <br />
          <Link to="/admin/login">Already have an Account ?</Link>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
