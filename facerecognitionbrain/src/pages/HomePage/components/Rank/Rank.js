import React from "react";

const Rank = ({userName, rank}) => {
  return (
    <div>
      <div className="white f4">{userName}, your current rank is..</div>
      <div className="white f2">{rank}</div>
    </div>
  );
};

export default Rank;
