import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LoginPage, SignupPage, MyFavorites, Forum, Planner, PlantSearch, UserDashboard } from "./pages";
import { ChakraProvider } from '@chakra-ui/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'


function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <UserProvider>
            {/* <Wrapper> */}
              <Header />
              <div className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/favorites" element={<MyFavorites />} />
                  <Route path="/florum" element={<Forum />} />
                  <Route path="/planner" element={<Planner />} />
                  <Route path="/search" element={<PlantSearch/>} />
                  <Route path="/dashboard" element={<UserDashboard/>} />
                </Routes>
                </div>
              <Footer />
            {/* </Wrapper> */}
          </UserProvider>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;

