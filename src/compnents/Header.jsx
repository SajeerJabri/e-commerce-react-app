import React from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import {
  Navbar,
  Nav,
  NavDropdown,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";

const Header = () => {
  const history = useHistory();
  const data = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);
  console.log(userEmail);
  const handleLogOut = () => {
    auth.signOut();
    dispatch({
      type: "DELETE_Email",
    });
  };

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#">
          <Link to="/">SYSCrowd</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">
              <Link to="/">Home</Link>{" "}
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/about">About</Link>{" "}
            </Nav.Link>
            {/* electronic dropdown */}
            <NavDropdown
              title="Electronics"
              className="dropdown"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">
                <Link to="/category/electronics/mobile">Mobile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to="/category/electronics/laptop">Laptop</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to="/category/electronics/tablet">Tablet</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <Link to="/category/electronics/">Electronics</Link>
              </NavDropdown.Item>
            </NavDropdown>
            {/* men fashin dropdown */}
            <NavDropdown
              title="Men Fashion"
              className="dropdown"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">
                <Link to="/category/men-fashion/casual-shirts">
                  Casual Shirts
                </Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to="/category/men-fashion/t-shirts">T-Shirts</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <Link to="/category/men-fashion">Men Fashion</Link>
              </NavDropdown.Item>
            </NavDropdown>
            {/* home appliances drowpdown */}
            <NavDropdown
              title="TV & Home Appliances"
              className="dropdown"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">
                <Link to="/category/home-appliance/air-conditioner">
                  Air Conditioner
                </Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to="/category/home-appliance/home-audio">Home Audio</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                <Link to="/category/home-appliance/video-devices">
                  TV & Video Devices
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <Link to="/category/home-appliance/">TV & Home Appliance</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Link to="/checkout" className="cart__icon">
                <ShoppingCartIcon />
                {userEmail ? (
                  <span>
                    <strong>{data.length}</strong>
                  </span>
                ) : (
                  0
                )}
              </Link>
            </Nav.Link>
            {userEmail ? (
              <button onClick={handleLogOut}>LogOut</button>
            ) : (
              <button onClick={() => history.push("/login")}>Login</button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
