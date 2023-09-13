import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Heading, SimpleGrid, Text, Button, AbsoluteCenter} from "@chakra-ui/react";
import '../styles/global.css'

const LoginPage = () => {
  const defForm = { email: "", password: "" };
  const [formData, setFormData] = useState(defForm);
  const [loginResult, setLoginResult] = useState("");
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await query.json();
    if (result && result.payload) {
      window.location.href = "/";
    } else {
      setLoginResult("fail");
    }
  };
  return (
    <>
      <div className="login-content"
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          background: "#F2EFE0",
          minHeight: "120vh"
        }}
      >
        <SimpleGrid
          alignItems={"center"}
          mt={20}
          spacing={10}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <AbsoluteCenter axis="horizontal" paddingTop="400px">
            <Card background="#85AE5A" size="lg" px={20} width="450px">
              <CardHeader>
                <Heading size="lg" color="#09302F">
                  {" "}
                  Log In
                </Heading>
              </CardHeader>
              <CardBody>
                <Text color="#09302F">Please log in</Text>
                <div className="form-group mb-3">
                  <label color="#09302F">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email@gmail.com"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label color="#6c9920">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn login"
                  colorScheme="orange"
                  onClick={handleFormSubmit}
                >
                  Log In
                </Button>
              </CardFooter>
              {loginResult === "success" && (
                <div className="alert alert-success" role="alert">
                  Login successful!
                </div>
              )}

              {loginResult === "fail" && (
                <div className="alert alert-danger" role="alert">
                  Login failed!
                </div>
              )}
            </Card>
          </AbsoluteCenter>
        </SimpleGrid>

        {loginResult === "success" && (
          <div className="alert alert-success" role="alert">
            Login successful!
          </div>
        )}

        {loginResult === "fail" && (
          <div className="alert alert-danger" role="alert">
            Login failed!
          </div>
        )}
      </div>
    </>
  );
};
export default LoginPage;
