import React from "react";
import './Image.css';
import Tony from "../../../assets/time.jpg"; // Importing an image

const ImageComponent = () => {
  return (
    <div className="image">
      <img src={Tony} alt="No amount of money ever bought a second of time"/>
    </div>
  );
}

export default ImageComponent;