import React from "react";

const Card = ({ imageSrc, title, description, tag }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={tag} />
      <div className ="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="submit">Take Me There</button>
      </div>
    </div>
  );
};

export default Card;