import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Stack,
  StackDivider,
  Box,
  UnorderedList,
  ListItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export default function MyFavorites(props) {
  const bold = {
    fontWeight: "bold",
  };

  const button = {
    margin: "10px",
  };

  const img = {
    borderRadius: "20px",
  };

  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/search");
  }

  return (
    <>
      <Grid
        h="500"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} bg="#85AE5A" m="4" textAlign="center">
          <Card bg="#85AE5A" size="lg">
            <CardHeader>
              <Heading size="md">My Favorite Plants</Heading>
            </CardHeader>
            <CardBody>
              <Text>List of Plants</Text>

              <Button colorScheme="orange">Delete</Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem rowSpan={5} colSpan={4} bg="#85AE5A" m="4">
          <Card bg="#85AE5A">
            <CardHeader>
              <Heading size="lg">Roma Tomato</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="1">
                <Box
                  boxSize="400px"
                  border="2px"
                  borderColor="black"
                  borderRadius="20px"
                  height="268px"
                >
                  <img
                    style={img}
                    src="https://hgshydro.com:5001/blog/hgs.19105c12-3b2c-4035-9b68-934641c3f27b_default.jpg"
                    alt=" of Searched Plant"
                  />
                </Box>
                <Box>
                  <UnorderedList>
                    <ListItem>
                      <span style={bold}>Type: </span>Vegetable
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Sow Space: </span>36
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Climbing: </span>no
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Sun: </span>full
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Grow Zone: </span>Zone 3 or higher
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Annual: </span>Yes
                    </ListItem>
                    <ListItem>
                      <span style={bold}>Maturity: </span>70-80 days
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Stack>
              <div>
                <Button style={button} colorScheme="orange">
                  Remove from Favorites
                </Button>
                <Button style={button} colorScheme="orange">
                  Add to Garden
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1} bg="#85AE5A" m="4" textAlign="center">
          <br />
          Return to Plant Search
          <br />
          {/* <Button onClick={redirect()} colorScheme="orange"> */}
          <Button onClick={handleClick} colorScheme="orange">
            Return
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}
