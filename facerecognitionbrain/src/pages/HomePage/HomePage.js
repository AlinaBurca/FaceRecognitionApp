import "./HomePage.css";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import ParticlesBg from "particles-bg";

function HomePage({ onLogout }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    //console.log("Data: ", data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  };
  const onSubmit = () => {
    setImageUrl(input);

    fetch("http://localhost:5000/api/face-detection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => displayFaceBox(calculateFaceLocation(data)))
      .catch((err) => console.error("Eroare:", err));
  };

  return (
    <div className="HomePage">
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={200} />
      <Navigation onLogout={onLogout} />

      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default HomePage;
