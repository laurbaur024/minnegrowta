import React, { useState } from "react";
import { useUserContext } from "../ctx/UserContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const { currUser, logout } = useUserContext();
  const navigate = useNavigate();
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    // Navigate to the search route/page with the search query
    navigate(`/search/${searchQuery}`);
  };

  return (
    <header className="header" style={{ borderBottom: "1px solid #333" }}>
      <Navbar bg="dark" variant="dark" expand="md">
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
              <Nav.Link onClick={() => setSearchBarVisible(!isSearchBarVisible)}>
                <i className="bi bi-search"></i>
              </Nav.Link>

              {isSearchBarVisible && (
                <div className="search-bar" style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Search for a plant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                      display: "inline-block", 
                      marginRight: "20px", 
                      borderRadius: "20px",
                      border: "1px solid #ccc",
                      padding: "8px", }}
                  />
                  <button 
                    onClick={handleSearch}
                    className="button"
                    style={{
                      color: 'white',
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      padding: "8px 16px", 
                      transition: "background-color 0.3s ease" }}
                    >Search</button>
                </div>
              )}

              {/* Conditional Rendering based on Authentication */}
              {currUser.status === "notfound" ? (
                <>
                <Nav.Link href="/login" className="navlink">Login</Nav.Link>
                <Nav.Link href="/signup" className="navlink2">Signup</Nav.Link>
                </>
              ) : (
                <>
                
                {/* <Nav.Link href="/login">Login</Nav.Link> */}
                  <Nav.Link href="/dashboard" className="navlink">Dashboard</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="navlink2">Logout</Nav.Link>
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