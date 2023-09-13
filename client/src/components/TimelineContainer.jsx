
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
      <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1KYRiJ2kC7BNs_OqV34RUeUsaktlrHNdnTG4Nxh60Dq4&font=Default&lang=en&initial_zoom=2&height=650' width='100%' height='650' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    </div>
  )
}

export default TimelineContainer;