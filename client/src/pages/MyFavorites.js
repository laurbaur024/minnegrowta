import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useUserContext } from "../ctx/UserContext";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
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

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;

  //based off of code starting on line 41 in Forum.js
  //attempting to pull favorites onto MyFavorites page
  const [results, setResults] = useState([]);

  const searchFavorites = async () => {
    const response = await fetch(`./api/user/${id}/favorites/:plantId`);
    const data = await response.json();
    setResults(data.payload);
  };
  useEffect(() => {
    searchFavorites();
  }, []);

  // const addGardenPlant = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch(`./api/user/${id}/garden/:plantId`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       _id: id,
  //       plantID: "64fb776ddf07cf20146e2015", //currently hardcoded with a plantId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const result = await response.json();
  //   console.log(result);
  // };

  //code into button Jackie/me
  //remove (delete) plant from user's favorites list
  //try to get plant id from page (not hard coded in)
  const onDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`./api/user/${id}/garden/:plantId`, {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
        plantID: "64fb776ddf07cf20146e2015", //currently hardcoded with a plantId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  };

  //from Forum.js
  const {
    isOpen: isFavoriteOpen,
    onOpen: onFavoriteOpen,
    onClose: onFavoriteClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <div className="fav-content">
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
                <Text>
                  <Link color="#09302F" href="#">
                    Roma Tomato
                  </Link>
                </Text>
                <Text>
                  <Link color="#09302F" href="#">
                    Plant 2
                  </Link>
                </Text>
                <Text>
                  <Link color="#09302F" href="#">
                    Plant 3
                  </Link>
                </Text>
                <Text>
                  <Link color="#09302F" href="#">
                    Plant 4
                  </Link>
                </Text>
                <Text>
                  <Link color="#09302F" href="#">
                    Plant 5
                  </Link>
                </Text>
                {/* <Button colorScheme="orange">Delete</Button> */}
              </CardBody>
            </Card>
          </GridItem>

          <GridItem rowSpan={5} colSpan={4} bg="#85AE5A" m="4">
            <Card bg="#85AE5A">
              {/* trying out accordian below based on Forum.js */}
              <Accordion>
                {results.map((data) => (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {`${data.title}`}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <div>
                        <img
                          src={`${data.image}`}
                          alt="image of plants"
                          width="500"
                          height="300"
                        ></img>
                      </div>
                      <div>{`${data.content}`}</div>
                      <Button onClick={onDeleteOpen}>
                        Remove Plant from Favorites
                      </Button>
                      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Remove Plant from Favorites</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <FormControl></FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="orange"
                              mr={3}
                              onClick={() => onDelete(data._id)}
                            >
                              Remove
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* commented out stuff below to try accordian style from Forum.js */}
              {/* <CardHeader>
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
              </CardBody> */}
            </Card>
          </GridItem>

          <GridItem colSpan={1} bg="#85AE5A" m="4" textAlign="center">
            <br />
            Return to Plant Search
            <br />
            <Button onClick={handleClick} colorScheme="orange">
              Return
            </Button>
          </GridItem>
        </Grid>
      </>
    </div>
  );
}
