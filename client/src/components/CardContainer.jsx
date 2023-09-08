import React from "react";
import Card from "./DashboardCards";


const CardContainer = () => {
  const cards = [

    { title: "My Favorites", description: "I love these plants!"},
    { title: "My Garden", description: "Plants in my garden / My gardening journal"},
    { title: "Forum", description: "Have a question or just want to share a spectacular picture of your garden?  Post it in the forum!"},
  ];

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </div>
  );
};

export default CardContainer;