import React from "react";
import { useUserContext } from "../ctx/UserContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const { currUser, logout } = useUserContext();

  return (
    <header className="pb-0 mb-0" style={{ borderBottom: "1px solid #333" }}>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          {/* Logo and Site Name */}
          <Navbar.Brand href="/">
            <img
              src="/favicon.png"
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
            <span className="logo-text">MinneGrowta</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>

            {/* Right-side Nav Options */}
            <Nav>
              {/* Search Icon */}
              <Nav.Link href="/search">
                <i className="bi bi-search"></i>
              </Nav.Link>

              {/* Conditional Rendering based on Authentication */}
              {currUser.status === "notfound" ? (
                <Nav.Link href="/login" className="navlink">Login</Nav.Link>
              ) : (
                <>
                
                {/* <Nav.Link href="/login">Login</Nav.Link> */}
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;