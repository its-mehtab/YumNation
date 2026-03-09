import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../../assets/icon/Check Mark.json";

const ThankYou = () => {
  return (
    <div>
      <Lottie
        animationData={successAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 100, height: 100 }}
      />
      <h4>ThankYou</h4>
    </div>
  );
};

export default ThankYou;
