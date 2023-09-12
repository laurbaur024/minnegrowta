import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useUserContext } from "../ctx/UserContext";
// import { useNavigate, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ButtonGroup,
  Card,
  CardHeader,
  Heading,
  Button,
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

  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/search");
  }

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  // const plantId = currUser?.data?._plantId;

  // const [removeMyFavPlant, setRemoveMyFavPlant] = useState("");

  const [results, setResults] = useState([]);

  const searchFavorites = async () => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setResults(data.payload.favPlant);
    console.log(data);
  };
  useEffect(() => {
    searchFavorites();
  }, []);

  //update (remove) plant from user's favorites list
  const removeFavPlant = async (e, plantId) => {
    e.preventDefault();
    navigate("/favorites");
    const response = await fetch(
      `./api/user/${id}/favorites-remove/${plantId}`,
      {
        method: "PUT",
        // body: JSON.stringify({
        //   _id: id,
        //   plantId: "65006b471b2ab4730c49f3b6",
        // }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result);
  };

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

  // function addPlantToGarden(event) {}

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
                <Heading size="md">
                  Click below to search for more plants
                </Heading>
              </CardHeader>
              <GridItem colSpan={1} bg="#85AE5A" m="4" textAlign="center">
                <br />
                Return to Plant Search
                <br />
                <Button onClick={handleClick} colorScheme="orange">
                  Return
                </Button>
              </GridItem>
            </Card>
          </GridItem>

          <GridItem colSpan={4}>
            <h2>My Favorite Plants</h2>
            <h6>Click on a plant name to see more details</h6>
            <Accordion>
              {results &&
                results.map((data) => (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {`${data.name}`}
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
                      <UnorderedList>
                        <ListItem>
                          <span style={bold}>Type: </span> {`${data.type}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Sow Space: </span>{" "}
                          {`${data.sowSpace}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Climbing: </span>{" "}
                          {`${data.climbing}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Sun: </span> {`${data.sun}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Grow Zones: </span>{" "}
                          {`${data.zone}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Annual: </span> {`${data.annual}`}
                        </ListItem>
                        <ListItem>
                          <span style={bold}>Maturity: </span>{" "}
                          {`${data.maturity}`}
                        </ListItem>
                      </UnorderedList>

                      <ButtonGroup spacing="6">
                        <Button
                          colorScheme="orange"
                          onClick={(e) => removeFavPlant(e, data._id)}
                        >
                          Remove from Favorites
                        </Button>
                        <Button
                          colorScheme="orange"
                          // onClick={addPlantToGarden}
                        >
                          Add to Garden
                        </Button>
                      </ButtonGroup>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
            </Accordion>
          </GridItem>
        </Grid>
      </>
    </div>
  );
}
