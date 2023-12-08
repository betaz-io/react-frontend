import React, { useState } from "react";
import Countdown from "react-countdown";
import CommonButton from "./commonButton";

export default function BuyTokenButton({
  text,
  date,
  isLoading,
  onClick,
  max,
  status,
}) {
  const renderer = ({ completed }) => {
    return (
      <CommonButton
        onClick={onClick}
        text={text}
        isLoading={isLoading}
        isDisabled={max == 0 || completed || !status}
      />
    );
  };
  return <Countdown key={date.toString()} date={date} renderer={renderer} />;
}
