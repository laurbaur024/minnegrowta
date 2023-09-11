import React from "react";
import { Link } from "react-router-dom";
// import Card from "./DashboardCards";
import { HStack } from "@chakra-ui/react";
import Fav from "../images/cute-happy-smiling-girl-hug-pot-with-plant-vector-30417575.jpg"
import Forum from "../images/group-chat-bubbles-or-forum-discussion-icon-vector-23623518.jpg"
import Garden from "../images/download.png"
import { CardBody, Text, Card, Button, Heading, Box, Flex } from "@chakra-ui/react";



const CardContainer = () => {
  const cards = [

    { img: Fav, title: "My Favorites", description: "I love these plants!"},
    { img: Garden, title: "My Garden", description: "Plants in my garden / My gardening journal"},
    { img: Forum, title: "Florum", description: "Have a question or just want to share a spectacular picture of your garden?  Post it in the florum!"},
  ];




  return (
    <HStack spacing={4}>
  {cards.map((card, index) => {
    const paths = ['/favorites', '/planner', '/florum'];

    return (
      <div className="container-card">
      <Card className="card-22" key={index} maxW="sm">
        <img className="img99"
          src={card.img}
          alt="flowers"
          style={{
            height: "auto",
            maxWidth: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <CardBody className="card-contents">
          <h3>{card.title}</h3>
          <Text>{card.description}</Text>
          <Link to={paths[index]}>
            <Button className="dashbutton" colorScheme="orange">
              {card.title}
            </Button>
          </Link>
        </CardBody>
      </Card>
      </div>
    );
  })}
</HStack>
  );
};

export default CardContainer;