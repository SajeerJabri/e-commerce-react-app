import React from "react";
import { useSelector } from "react-redux";

const Mobile = () => {
  const mobile = useSelector(state => state.samsung);
  console.log(mobile);
  return (
    <div className="m-5">
      <h1 className="m-5">Mobile component</h1>
    </div>
  );
};

export default Mobile;
