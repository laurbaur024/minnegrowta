import React, { useState } from "react";
import { useUserContext } from "../ctx/UserContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom"; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = ({setSearch}) => {
  const { currUser, logout } = useUserContext();
  const navigate = useNavigate();
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;

  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchToggle = () => {
    // Toggle search bar
    setSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearch = async () => {
   const response = await fetch(`/api/plant/search/${searchQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    });
    const result = await response.json();
    console.log(result.payload)
    setSearch(result.payload)
    navigate("/search");
    };

  const handleFavoritesClick = () => {
    // Navigate to the favorites page
    navigate("/favorites");
  };


  return (
    <header className="header" style={{ borderBottom: "1px solid #333" }}>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container fluid>
          {/* Logo and Site Name */}
          <Navbar.Brand className="me-auto" href="/">
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
              <Nav.Link onClick={handleSearchToggle}>
                {isSearchBarVisible ? (
                  <i className="bi bi-x"></i>
                ) : (
                  <i className="bi bi-search"></i>
                )}
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
                  {currentPath !== "/login" && (
                    <Nav.Link href="/login" className="navlink">Login</Nav.Link>
                  )}
                  {currentPath !== "/signup" && (
                    <Nav.Link href="/signup" className="navlink2">Signup</Nav.Link>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleFavoritesClick}>
                  <i className="bi bi-star"></i>
                  </Nav.Link>
                  {currentPath !== "/florum" && (
                    <Nav.Link href="/florum" className="navlink3">Florum</Nav.Link>
                  )}
                  {currentPath !== "/planner" && (
                    <Nav.Link href="/planner" className="navlink4" style={{ whiteSpace: "nowrap" }}>My Garden</Nav.Link>
                  )}
                  {currentPath !== "/dashboard" && (
                    <Nav.Link href="/dashboard" className="navlink5">Dashboard</Nav.Link>
                  )}
                  <Nav.Link onClick={handleLogout} className="navlink6">Logout</Nav.Link>
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
