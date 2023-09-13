import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Heading, SimpleGrid, Text, Button, AbsoluteCenter,} from "@chakra-ui/react";

const SignupPage = (props) => {
  const defForm = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(defForm);
  const [signupResult, setSignupResult] = useState("");
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const query = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!query.ok) {
      setSignupResult("fail");
    } else {
      const result = await query.json();
      if (result.status === "success" && result.payload) {
        window.location.href = "/";
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        background: "#F2EFE0",
        minHeight: "140vh",
        
      }}
    >
      <SimpleGrid
        alignItems={"center"}
        mt={20}
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <AbsoluteCenter axis="horizontal" paddingTop="500px">
          <Card background="#85AE5A" size="lg" px={20} width="500px">
            <CardHeader>
              <Heading size="lg" color="#09302F">
                {" "}
                Sign Up
              </Heading>
            </CardHeader>
            <CardBody>
              <Text color="#09302F">Please create a new account</Text>
              <div className="form-group mb-3">
                <label color="#09302F">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="form-control"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label color="#6c9920">Email Address</label>
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
                  placeholder="Enter a password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button
                className="btn signup"
                colorScheme="orange"
                onClick={handleFormSubmit}
              >
                Sign Up
              </Button>
            </CardFooter>
            {signupResult === "fail" && (
              <div className="alert alert-danger" role="alert">
                Signup failed!
              </div>
            )}
          </Card>
        </AbsoluteCenter>
      </SimpleGrid>
    </div>
  );
};
export default SignupPage;
