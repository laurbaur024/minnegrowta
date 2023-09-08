import React from "react";
import Timeline from "./Timeline";


const TimelineContainer = () => {
  return(
    <div>
      {Timeline}
      <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1KYRiJ2kC7BNs_OqV34RUeUsaktlrHNdnTG4Nxh60Dq4&font=Default&lang=en&initial_zoom=2&height=650' width='100%' height='650' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    </div>
  )
}

export default TimelineContainer;