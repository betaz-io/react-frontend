import { Box, Text } from "@chakra-ui/react";
import { AddressCopierMobile } from "components/addressCopier";
import { AddressCopier } from "components/addressCopier";
import { AppIcon, AzeroIcon } from "components/icons";
import { formatNumDynDecimal, formatTokenBalance } from "utils";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "withdrawer":
      return <AddressCopier address={value} justifyContent="center" />;
    case "receiver":
      return <AddressCopier address={value} justifyContent="center" />;
    case "amount":
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
    case "time":
      const date = new Date(value);

      // console.log({date, value})
      const formatted_date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return <Text textAlign="center">{formatted_date}</Text>;

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
