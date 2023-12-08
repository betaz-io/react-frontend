import { Flex, Text } from "@chakra-ui/react";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
// import { CopyIcon } from "components/icons/Icons";
import { toast } from "react-hot-toast";
import { BiCopyAlt } from "react-icons/bi";
import { addressShortener } from "utils";

export const AddressCopier = ({ address, truncated = true, fontWeight }) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Flex
        cursor="pointer"
        alignItems="center"
        onClick={() => handleCopy("Address", address)}
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold", color: "#F7F7F8" }}
      >
        <Text mr="4px">
          {truncated ? addressShortener(address) : address}
        </Text>
        <BiCopyAlt w="24px" h="21px" />
      </Flex>
    </>
  );
};
// sx={{ fontWeight }}

export const AddressCopierMobile = ({ address, truncated = true, fontWeight }) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Flex
        cursor="pointer"
        alignItems="center"
        onClick={() => handleCopy("Address", address)}
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold"}}
        className="linear-text"
      >
        <Text mr="4px">
          {truncated ? addressShortener(address) : address}
        </Text>
        <BiCopyAlt w="24px" h="21px" />
      </Flex>
    </>
  );
};