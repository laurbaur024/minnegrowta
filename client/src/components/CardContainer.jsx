import React from "react";
// import Card from "./DashboardCards";
import { Stack } from "@chakra-ui/react";
import Orange from "../images/orange.jpg"
import Forum from "../images/forum.jpg"
import Garden from "../images/garden.jpeg"
import { CardBody, Text, Card, Button} from "@chakra-ui/react";



const CardContainer = () => {
  const cards = [

    { img: {Orange}, title: "My Favorites", description: "I love these plants!"},
    { img: {Forum}, title: "My Garden", description: "Plants in my garden / My gardening journal"},
    { img: {Garden}, title: "Forum", description: "Have a question or just want to share a spectacular picture of your garden?  Post it in the forum!"},
  ];




  return (
   <div>
      <Card>
        <CardBody>
          <h3>My Favorites</h3>
          <Text>I love these plants!</Text>
          <img src={Orange} alt='flowers' style={{ width: "300px", height: "300px"}} />
          <Button colorScheme="orange">My Favorites</Button>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>My Garden</h3>
          <Text>Plants in My Garden</Text>
          <img src={Garden} alt='garden' style={{ width: "300px", height: "300px"}} />
          <Button colorScheme="orange">My Garden</Button>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>Forum</h3>
          <Text>Have a question or just want to share a beautiful photo of your garden? Post it in the forum!</Text>
          <img src={Forum} alt='Garden with fountain' style={{ width: "300px", height: "300px"}} />
          <Button colorScheme="orange">Forum</Button>
        </CardBody>
      </Card>
    </div> 


    // <div className="card-container">
    //   {cards.map((card, index) => (
    //     <Card key={index} title={card.title} description={card.description} img={card.img} />
    //   ))}
    // </div>
  );
};

export default CardContainer;