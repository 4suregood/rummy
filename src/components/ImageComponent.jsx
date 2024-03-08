import React from "react";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";

//queen_of_hearts.svg
const imagesList = [
    {
      id: 1,
      src: image1,
      alt: "Image 1",
    },
    {
      id: 2,
      src: image2,
      alt: "Image 2",
    },
    {
      id: 3,
      src: image3,
      alt: "Image 3",
    },
  ];
  
  function ImagesComponent() {
    return (
      <div>
        {imagesList.map((image) => (
          <img key={image.id} src={image.src} alt={image.alt} />
        ))}
      </div>
    );
  }
  
  export default ImagesComponent;
  