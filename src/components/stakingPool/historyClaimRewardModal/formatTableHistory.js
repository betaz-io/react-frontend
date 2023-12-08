import { Box, Flex, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import { AppIcon, AzeroIcon } from "components/icons";

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + "/" + month + "/" + year;
};

export const formatTableValue = (value, key) => {
  switch (key) {
    case "staker":
      return (
        <Flex minH="40px">
          <AddressCopier address={value} />
        </Flex>
      );
    case "time":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Text textAlign="center">{formatTimestamp(value)}</Text>
          </Box>
        </Flex>
      );
    case "reward_amount":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Text textAlign="center">{Math.floor(value * 10000) / 10000}</Text>
            <AzeroIcon size="11px" padding="0px 5px 0px 4px" />
          </Box>
        </Flex>
      );
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "staker":
      return (
        <Flex minH="40px">
          <AddressCopier address={value} />
        </Flex>
      );
    case "time":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Text textAlign="center" className="linear-text">
              {formatTimestamp(value)}
            </Text>
          </Box>
        </Flex>
      );
    case "reward_amount":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Text textAlign="center" className="linear-text">
              {Math.floor(value * 10000) / 10000}
            </Text>
            <AzeroIcon size="11px" padding="0px 5px 0px 4px" />
          </Box>
        </Flex>
      );
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};
