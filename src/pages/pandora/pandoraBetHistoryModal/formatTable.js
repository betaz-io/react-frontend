import { Box, Text } from "@chakra-ui/react";
import { AddressCopierMobile } from "components/addressCopier";
import { AddressCopier } from "components/addressCopier";
import { AppIcon, AzeroIcon } from "components/icons";
import { convertToFixedLengthNumberString } from "utils";
import { isAddressValid } from "utils";
import { formatNumDynDecimal, formatTokenBalance } from "utils";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "playerWin":
      return isAddressValid(value) ? (
        <AddressCopier address={value} justifyContent="center" />
      ) : (
        <Text textAlign="center">{value}</Text>
      );
    case "chainlinkRequestId":
      return <AddressCopier address={value} justifyContent="center" />;
    case "rewardAmount":
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text textAlign="center">{formatNumDynDecimal(value)}</Text>
          <AppIcon
            size={{ base: "14px", sm: "14px" }}
            padding={{
              base: "0px 0px 0px 4px",
              sm: "0px 0px 0px 4px",
            }}
          />
        </Box>
      );
    case "betNumberWin":
      const betNumber = convertToFixedLengthNumberString(value, 6);
      return <Text textAlign="center">{betNumber}</Text>;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "playerWin":
      return <AddressCopierMobile address={value} />;
    case "chainlinkRequestId":
      return <AddressCopierMobile address={value} />;
    case "rewardAmount":
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text textAlign="center">{formatNumDynDecimal(value)}</Text>
          <AppIcon
            size={{ base: "14px", sm: "14px" }}
            padding={{
              base: "0px 0px 0px 4px",
              sm: "0px 0px 0px 4px",
            }}
          />
        </Box>
      );
    default:
      return (
        <Text textAlign="center" className="linear-text">
          {value}
        </Text>
      );
  }
};
