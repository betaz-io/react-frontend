import { Box, Link, Text, Tooltip } from "@chakra-ui/react";
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
        <AddressCopier
          address={value}
          justifyContent="center"
          style={{
            margin: "auto",
          }}
        />
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
      const betNumber = convertToFixedLengthNumberString(
        value?.betNumberWin,
        6
      );
      if (value?.txHash)
        return (
          <Box mx={"auto"} w={"max-content"}>
            <Tooltip label="Go to etherscan">
              <Link
                color={"white"}
                target="_blank"
                href={`https://sepolia.etherscan.io/tx/${value?.txHash}`}
                textAlign="center"
                sx={{
                  _hover: {
                    color: "#1beca7",
                  },
                }}
              >
                {betNumber}
              </Link>
            </Tooltip>
          </Box>
        );
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
