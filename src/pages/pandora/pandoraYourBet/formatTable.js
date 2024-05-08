import { Box, Text } from "@chakra-ui/react";
import { AddressCopierMobile } from "components/addressCopier";
import { AddressCopier } from "components/addressCopier";
import { AppIcon, AzeroIcon } from "components/icons";
import { convertToFixedLengthNumberString } from "utils";
import { formatNumDynDecimal, formatTokenBalance } from "utils";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "timeStamp":
      const date = new Date(value);

      // console.log({date, value})
      const formatted_date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return <Text textAlign="center">{formatted_date}</Text>;
    case "betNumber":
      const betNumber = convertToFixedLengthNumberString(value, 6);
      return <Text textAlign="center">{betNumber}</Text>;
    default:
      return <Text textAlign="center">{value}</Text>;
  }
};

export const formatTableValueMobile = (value, key) => {
  switch (key) {
    case "timeStamp":
      const date = new Date(value);

      // console.log({date, value})
      const formatted_date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return <Text textAlign="center">{formatted_date}</Text>;

    default:
      return (
        <Text textAlign="center" className="linear-text">
          {value}
        </Text>
      );
  }
};
