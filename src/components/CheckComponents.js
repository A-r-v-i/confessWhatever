import React, { useState, useEffect } from "react";

function CheckComponent(props) {
  const [number, setNumber] = useState(0);
  // const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // console.log("effect called");
    window.addEventListener("mousemove", (e) => {
      // console.log(e.clientX, e.clientY);
      // setCoords({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const updateNumber = () => {
    setNumber((prevNum) => prevNum + 5);
    props.updateNum(number);
  };

  return (
    <div id="wrap">
      {number}
      <button onClick={updateNumber}>A</button>
      <br />
      {/* x:{coords.x}, y:{coords.y} */}
    </div>
  );
}

export default CheckComponent;


