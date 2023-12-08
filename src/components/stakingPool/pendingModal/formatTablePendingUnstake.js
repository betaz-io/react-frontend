import { Box, Flex, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import PendingUnstakeButton from "components/button/pendingUnstakeButton";
import BETAZPendingUnstakeCountDown from "components/countdown/PendingUnstakeCountDown";
import { AppIcon, AzeroIcon } from "components/icons";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "caller":
      return (
        <Flex minH="40px">
          <AddressCopier address={value} />
        </Flex>
      );
    case "amount":
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
            <Text textAlign="center">{value}</Text>
            <AppIcon size="13px" padding="0px 6px 0px 6px" />
          </Box>
        </Flex>
      );
    case "time":
      return (
        <Flex minH="40px" justifyContent="center" alignItems="center">
          <BETAZPendingUnstakeCountDown date={value} />
        </Flex>
      );
    case "action":
      return <PendingUnstakeButton data={value} />;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "caller":
      return (
        <Flex minH="40px">
          <AddressCopier address={value} />
        </Flex>
      );
    case "amount":
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
              {value}
            </Text>
            <AzeroIcon size="11px" padding="0px 6px 0px 6px" />
          </Box>
        </Flex>
      );
    case "time":
      return (
        <Flex
          minH="40px"
          justifyContent="center"
          alignItems="center"
          className="linear-text"
        >
          <BETAZPendingUnstakeCountDown date={value} />
        </Flex>
      );
    case "action":
      return <PendingUnstakeButton data={value} />;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};
