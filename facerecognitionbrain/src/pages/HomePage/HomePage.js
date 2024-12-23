import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import {jwtDecode} from "jwt-decode";

import ParticlesBg from "particles-bg";

function HomePage({ onLogout }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [userName, setUserName] = useState(""); 
  const [userId, setUserId] = useState("");
  const [rank, setRank] = useState(0);  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded token: ", decodedToken);
      setUserName(decodedToken.name);
      setUserId(decodedToken.id); 
    }
  }, []); 
  
  useEffect(() => {
    const fetchRank = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://facerecognitionapp-fpvf.onrender.com/user/rank", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: userId }), 
        });
        if (!response.ok) {
          throw new Error("Failed to fetch rank");
        }
        const data = await response.json();
        setRank(data.entries);
      } catch (error) {
        console.error("Error during fetching rank:", error.message);
      }
    };
  
    if (userId) {
      fetchRank(); 
    }
  }, [userId]); 
  

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    
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
  const onSubmit = async () => {
    
    try{
       setImageUrl(input);
      const token = localStorage.getItem("token");

   const response = await fetch("https://facerecognitionapp-fpvf.onrender.com/api/face-detection", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify({ imageUrl: input }), 
    })
      
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || "Face detection failed");

  }
    const data = await response.json();
    displayFaceBox(calculateFaceLocation(data));
    const result = await fetch("https://facerecognitionapp-fpvf.onrender.com/image", {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify({ id: userId }),
    });
    const number = await result.json();
    console.log("Entries:", number.entries);
    setRank(number.entries);

}catch(error){
  console.error("Error during face detection:", error.message);
}
  };

  return (
    <div className="HomePage">
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={200} />
      <Navigation onLogout={onLogout} />

      <Rank userName={userName} rank={rank}/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default HomePage;
