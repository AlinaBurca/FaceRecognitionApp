import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="center">
      <p className="f4">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>

      <div className="pa3 br2 shadow-5 form">
        <input type="text" className="f4 pa2 w-70 " onChange={onInputChange} />
        <button
          className="w-30 grow f4 link ph pv2 dib white "
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
