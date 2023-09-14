import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext";
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
  AbsoluteCenter,
} from "@chakra-ui/react";

export default function MyFavorites(props) {
  const bold = {
    fontWeight: "bold",
  };

  const navigate = useNavigate();

  // function handleClick(event) {
  //   navigate("/search");
  // }

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;

  const [results, setResults] = useState([]);

  // user's favorite plants on MyFavorites page
  const searchFavorites = async () => {
    const response = await fetch(`/api/user/myfavorites/${id}`);
    const data = await response.json();
    setResults(data.payload?.favPlant);
    console.log(data);
  };
  useEffect(() => {
    searchFavorites();
  }, []);

  //update (remove) plant from user's favorites list
  const removeFavPlant = async (e, plantId) => {
    e.preventDefault();

    const response = await fetch(
      `./api/user/${id}/favorites-remove/${plantId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setResults([
      ...results.filter((plant) => {
        if (plant._id !== plantId) {
          return true;
        }
      }),
    ]);
    console.log(result);
  };

  const addGardenPlant = async (e, plantId) => {
    e.preventDefault();
    const response = await fetch(`./api/user/${id}/addgarden/${plantId}`, {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    console.log(result);
  };

  return (
    <div className="fav-content">
      <>
        <Grid
          className="favgrid"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          <GridItem colSpan={1}>
            <Card className="favleftcard" size="lg">
              <CardHeader className="pvanish">
                <Box className="contentz">
                  <Heading size="md" padding="5px">
                    To add more plants to your favorites, click the magnifying
                    glass at the top of the screen and type a plant name from
                    below. Click the star next to the plants you want to add.
                  </Heading>
                </Box>
              </CardHeader>
              <h5>Popular Search Terms:</h5>
              <UnorderedList className="termlist">
                <ListItem>Beans</ListItem>
                <ListItem>Greens</ListItem>
                <ListItem>Fruit</ListItem>
                <ListItem>Flowers</ListItem>
                <ListItem>Onions</ListItem>
                <ListItem>Pepper</ListItem>
                <ListItem>Potato</ListItem>
                <ListItem>Root</ListItem>
                <ListItem>Tomato</ListItem>
                <ListItem>Vegetable</ListItem>
              </UnorderedList>
            </Card>
          </GridItem>
          <GridItem className="favrightcard" rowSpan={1} colSpan={2}>
            <h2 className="planner-title">My Favorite Plants</h2>
            <h6>Click on a plant name to see more details</h6>
            <Accordion allowToggle>
              {results &&
                results.map((data) => (
                  <AccordionItem className="fav-acc">
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {`${data.name}`}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="forum-panel" pb="1em">
                      <Box
                        maxH="400px"
                        overflowY="auto"
                        border="1px solid lightgrey"
                        borderRadius="8px"
                        pb="1em"
                        mb="1em"
                      >
                        <div className="forum-img">
                          <img
                            src={`${data.image}`}
                            alt="image of plants"
                            width="100%"
                            height="auto"
                          ></img>
                        </div>
                      </Box>
                      <Box
                        className="forum-panel"
                        maxH="20em"
                        overflowY="auto"
                        border="1px solid lightgrey"
                        borderRadius="8px"
                        mb="1em"
                      >
                        <UnorderedList textAlign="left" ml="2em">
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
                            <span style={bold}>Annual: </span>{" "}
                            {`${data.annual}`}
                          </ListItem>
                          <ListItem>
                            <span style={bold}>Maturity: </span>{" "}
                            {`${data.maturity}`} days
                          </ListItem>
                        </UnorderedList>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ButtonGroup spacing="6">
                          <Button
                            colorScheme="orange"
                            onClick={(e) => removeFavPlant(e, data._id)}
                          >
                            Remove
                          </Button>
                          <Button
                            colorScheme="orange"
                            onClick={(e) => addGardenPlant(e, data._id)}
                          >
                            Add to Garden
                          </Button>
                        </ButtonGroup>
                      </Box>
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
