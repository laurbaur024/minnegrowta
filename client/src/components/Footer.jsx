import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Navbar bg="dark" variant="dark">
          <Navbar.Collapse className="justify-content-between">
            <div className="quote text-center mb-2">
              <p style={{ fontStyle: "italic", margin: 0 }}>"Your Quote Here" -Author</p>
            </div>
            <div className="footer-info">
              &copy; MinneGrowta @ 2023
            </div>
            <div className="footer-links">
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </footer>
  );
};

export default Footer;