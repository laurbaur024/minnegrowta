import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Card from "./DashboardCards";
import { HStack, VStack } from "@chakra-ui/react";
import Fav from "../images/cute-happy-smiling-girl-hug-pot-with-plant-vector-30417575.jpg"
import Forum from "../images/group-chat-bubbles-or-forum-discussion-icon-vector-23623518.jpg"
import Garden from "../images/download.png"
import { CardBody, Text, Card, Button} from "@chakra-ui/react";
import "../styles/global.css";

const CardContainer = () => {
  const cards = [

    { img: Fav, title: "My Favorites", description: "I love these plants!", buttonColor: "blue" },
    { img: Garden, title: "My Garden", description: "Plants in my garden / My gardening journal", buttonColor: "green" },
    { img: Forum, title: "The Florum", description: "Have a question or just want to share a spectacular picture of your garden?  Post it in the florum!", buttonColor: "orange" },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 472);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-center">
      {/* Conditional rendering based on screen width */}
      {isSmallScreen ? (
        <VStack spacing={4}>
          {cards.map((card, index) => (
            <div className="container-card" key={index}>
              <Button className={`dashbutton-${card.buttonColor}`} colorScheme={card.buttonColor}>
                {card.title}
              </Button>
            </div>
          ))}
        </VStack>
      ) : (
        <HStack spacing={4}>
          {cards.map((card, index) => {
            const paths = ['/favorites', '/planner', '/florum'];

            return (
              <div className="container-card" key={index}>
                <Card className={`card-22`} maxW="sm">
                  <>
                    <img
                      src={card.img}
                      alt="flowers"
                      className="img99"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxHeight: "100%",
                      }}
                    />
                    <CardBody className="card-contents" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <h3 style={{ whiteSpace: 'nowrap' }}>{card.title}</h3>
                      <Text className="descr">{card.description}</Text>
                      <Link to={paths[index]}>
                        <Button className={`dashbutton-${card.buttonColor}`} colorScheme={card.buttonColor}>
                          {card.title}
                        </Button>
                      </Link>
                    </CardBody>
                  </>
                </Card>
              </div>
            );
          })}
        </HStack>
      )}
    </div>
  );
};

export default CardContainer;