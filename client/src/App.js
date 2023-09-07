import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Wrapper } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LoginPage, SignupPage } from "./pages";
import { ChakraProvider } from '@chakra-ui/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'


function App() {
  return (
    // <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <Wrapper>
            <Header />
            <div className="pt-3 px-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </div>
          </Wrapper>
        </UserProvider>
      </BrowserRouter>
    // </ChakraProvider>
  );
}

export default App;
