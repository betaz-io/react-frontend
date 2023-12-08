import React from "react";
import Countdown, { zeroPad } from "react-countdown";

import { Flex, Text, SimpleGrid } from "@chakra-ui/react";

const TextCountdown = ({ text }) => {
  return (
    <Text
      className="deposit-circle-finish-countdown"
      color="#a4b0b6"
      fontSize={{ base: "18px", sm: "32px" }}
    >
      {zeroPad(text) || "00"}
    </Text>
  );
};

const TextUnit = ({ text }) => {
  return (
    <Text
      className="deposit-circle-finish-countdown-unit"
      fontSize={{ base: "10px", sm: "18px" }}
      mb={{ base: "3px", sm: "6px" }}
    >
      {text}
    </Text>
  );
};

export default function BETAZCountDown({ date }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <SimpleGrid columns={4} spacing="10px">
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown"
              color="#a4b0b6"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              00
            </Text>
            <TextUnit text={"d"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown"
              color="#a4b0b6"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              00
            </Text>
            <TextUnit text={"h"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown"
              color="#a4b0b6"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              00
            </Text>
            <TextUnit text={"m"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown"
              color="#a4b0b6"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              00
            </Text>
            <TextUnit text={"s"} />
          </Flex>
        </SimpleGrid>
      );
    } else {
      return (
        <SimpleGrid columns={4} spacing="10px">
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown linear-text-color-01"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              {zeroPad(days) || "00"}
            </Text>
            <TextUnit text={"d"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown linear-text-color-01"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              {zeroPad(hours) || "00"}
            </Text>
            <TextUnit text={"h"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown linear-text-color-01"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              {zeroPad(minutes) || "00"}
            </Text>
            <TextUnit text={"m"} />
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              className="deposit-circle-finish-countdown linear-text-color-01"
              fontSize={{ base: "18px", sm: "32px" }}
            >
              {zeroPad(seconds) || "00"}
            </Text>
            <TextUnit text={"s"} />
          </Flex>
        </SimpleGrid>
      );
    }
  };
  return (
    <span>
      <Countdown key={date?.toString()} date={date} renderer={renderer} />
    </span>
  );
}
