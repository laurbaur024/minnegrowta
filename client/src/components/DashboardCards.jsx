import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <button type="submit">Take Me There</button>
    </div>
  );
};

export default Card;