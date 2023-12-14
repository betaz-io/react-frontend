import {
  Flex,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { useEffect, useState } from "react";
// import { CopyIcon } from "components/icons/Icons";
import { toast } from "react-hot-toast";
import { BiCopyAlt } from "react-icons/bi";
import { truncateStr } from "utils";
import { addressShortener, resolveDomain } from "utils";

export const AddressCopier = ({ address, truncated = true, fontWeight }) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  const [azeroID, setAzeroID] = useState(null);

  useEffect(() => {
    resolveDomain(address).then((domains) => {
      setAzeroID(domains);
    });
  }, [address]);

  if (azeroID)
    return (
      <Menu
        isLazy
        cursor="pointer"
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold", color: "#F7F7F8" }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              _hover={{ color: "text.2" }}
              sx={{
                display: "flex",
                flexDirection: "row",
                fontWeight: fontWeight || "bold",
              }}
            >
              <Flex alignItems="center">
                <Text mr="4px">{truncateStr(azeroID, 7)} </Text>
                <BiCopyAlt w="24px" h="21px" color="white" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize={"16px"}
                onClick={() => handleCopy("Azero ID", azeroID)}
              >
                Copy ID
              </MenuItem>
              <MenuItem
                fontSize={"16px"}
                onClick={() => handleCopy("Address", address)}
              >
                Copy address
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  return (
    <>
      <Flex
        cursor="pointer"
        alignItems="center"
        onClick={() => handleCopy("Address", address)}
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold", color: "#F7F7F8" }}
      >
        <Text mr="4px">{truncated ? addressShortener(address) : address}</Text>
        <BiCopyAlt w="24px" h="21px" />
      </Flex>
    </>
  );
};
// sx={{ fontWeight }}

export const AddressCopierMobile = ({
  address,
  truncated = true,
  fontWeight,
}) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  const [azeroID, setAzeroID] = useState(null);

  useEffect(() => {
    resolveDomain(address).then((domains) => {
      setAzeroID(domains);
    });
  }, [address]);

  if (azeroID)
    return (
      <Menu
        isLazy
        cursor="pointer"
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold", color: "#F7F7F8" }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              _hover={{ color: "text.2" }}
              sx={{
                display: "flex",
                flexDirection: "row",
                fontWeight: fontWeight || "bold",
              }}
            >
              <Flex alignItems="center">
                <Text mr="4px">{azeroID || addressShortener(address)} </Text>
                <BiCopyAlt w="24px" h="21px" color="white" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                fontSize={"16px"}
                onClick={() => handleCopy("Azero ID", azeroID)}
              >
                Copy ID
              </MenuItem>
              <MenuItem
                fontSize={"16px"}
                onClick={() => handleCopy("Address", address)}
              >
                Copy address
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  return (
    <>
      <Flex
        cursor="pointer"
        alignItems="center"
        onClick={() => handleCopy("Address", address)}
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold" }}
        className="linear-text"
      >
        <Text mr="4px">{truncated ? addressShortener(address) : address}</Text>
        <BiCopyAlt w="24px" h="21px" />
      </Flex>
    </>
  );
};
