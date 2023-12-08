import { Box, Flex, Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";
import CommonButton from "components/button/commonButton";
import UpdateWhitelistButton from "components/button/updateWhitelistButton";
import { AppIcon, AzeroIcon } from "components/icons";
import { useModal } from "contexts/useModal";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "buyer":
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
            <AppIcon size="14px" padding="0px 0px 0px 4px" />
          </Box>
        </Flex>
      );
    case "price":
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
            <AzeroIcon size="11px" padding="0px 6px 0px 6px" />
          </Box>
        </Flex>
      );
    case "action":
      return <UpdateWhitelistButton data={value} />;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "buyer":
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
            <AppIcon size="14px" padding="0px 0px 0px 4px" />
          </Box>
        </Flex>
      );
    case "price":
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
            <AzeroIcon size="11px" padding="0px 6px 0px 6px" />
          </Box>
        </Flex>
      );
    case "action":
      return (
        <Flex justifyContent="center">
          <CommonButton
            onClick={() => {
              console.log(value);
            }}
            text="Unstake"
          />
        </Flex>
      );
    case "action":
      return <UpdateWhitelistButton data={value} />;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};
