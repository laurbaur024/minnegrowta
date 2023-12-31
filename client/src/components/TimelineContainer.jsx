
import React from "react";
import { useState, useEffect } from "react";

  
const TimelineContainer = () => {
    const [results, setResults] = useState([]);
    const searchForum = async () => {
      const response = await fetch("/api/forum");
      const data = await response.json()
      setResults(data.payload);
      // console.log(data.payload)
    }
    useEffect(() => {
      searchForum();
    }, []);

  return(
    <div>
      <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1sC4KaOlk1-vfw2tH0IQWgbK8POkwo8SSMDPkH63EQWk&font=Default&lang=en&initial_zoom=2&height=500' width='100%' height='500' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>    </div>
  )
}

export default TimelineContainer;