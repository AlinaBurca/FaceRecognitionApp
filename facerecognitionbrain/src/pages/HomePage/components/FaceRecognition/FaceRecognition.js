import React from "react";
import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="image-div">
        <img alt="" id="inputimage" className="img" src={imageUrl} />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
