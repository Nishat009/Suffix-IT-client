import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navigation"
        variant="dark"
      >
        <Container>
          <Navbar.Brand justify className="justify-content-start" href="#home">
            Suffix IT Limited
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className=" menus ps-5">
              <Link className=" menu" to="/home">
                Home
              </Link>
              <Link className=" menu" to="/about">
                About
              </Link>
              <Link className=" menu" to="/contact">
                Contact
              </Link>
              <Link className=" menu" to="/user">
                User
              </Link>
            </Nav>
            <Nav className="login-button">
              <button class="btn sign">Login</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
