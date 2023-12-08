import React from "react";
import Countdown, { zeroPad } from "react-countdown";

import { Flex, Text } from "@chakra-ui/react";

export default function BETAZPendingUnstakeCountDown({ date }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Text textAlign="center" color="white" minW="40px">{`--:--:--`}</Text>;
    } else {
      return (
        <Flex justifyContent="center">
          <Text textAlign="center" color="white" minW="40px">
            {`${days ? `${zeroPad(days)}d` : ""} ${zeroPad(hours)}h ${zeroPad(
              minutes
            )}m ${zeroPad(seconds)}s`}
          </Text>
        </Flex>
      );
    }
  };
  return (
    <span>
      <Countdown key={date?.toString()} date={date} renderer={renderer} />
    </span>
  );
}
