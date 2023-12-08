import { Text } from "@chakra-ui/react";
import { AddressCopier } from "components/addressCopier";

export const formatTableValue = (value, key) => {
  switch (key) {
    case "email":
      return <AddressCopier address={value} />;
    case "timer":
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
