import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { supportedChain } from "components/wallet/data";
import { useNetwork } from "./useNetWork";
import { AiOutlineCheck } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";

const ChainItem = ({ data }) => {
  const { currentNetwork, updateNetwork } = useNetwork();
  return (
    <MenuItem
      sx={{
        background: "transparent",
        display: "flex",
        justifyContent: "space-between",
      }}
      onClick={() => updateNetwork(data)}
    >
      <Box display={{ base: "flex" }} alignItems="center">
        <Image height={{ base: "32px" }} alt="logo-app" src={data?.icon} />
        <Text
          sx={{
            color: "#FFF",
            fontsize: "14px",
            marginLeft: "12px",
          }}
        >
          {data?.label}
        </Text>
      </Box>
      {currentNetwork?.key == data?.key && <AiOutlineCheck color="#1BECA6" />}
    </MenuItem>
  );
};
const NetWorkButton = () => {
  const { currentNetwork } = useNetwork();
  const isMobile = useCheckMobileScreen(992);
  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              sx={{
                color: "white",
                border: isOpen ? "1px solid #1BECA6" : "1px solid transparent",
                borderRadius: "12px",
                background: "#0D171B",
                px: "12px",
                py: "10px",
                // minW: "180px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      minW: "24px",
                      minHeight: "24px",
                      background: currentNetwork?.icon || "gray",
                    }}
                  >
                    {currentNetwork?.icon && (
                      <Image
                        height={{ base: "24px" }}
                        alt="logo-app"
                        src={currentNetwork?.icon}                       
                      />
                    )}
                  </Box>
                  {isMobile ? null : (
                    <Text
                      sx={{
                        color: "#FFF",
                        fontsize: "16px",
                        marginLeft: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {currentNetwork?.label || "Select Network"}
                    </Text>
                  )}
                </Box>
                {supportedChain.length > 1 ? (
                  <>
                    {isOpen ? (
                      <BiChevronUp size={24} style={{ marginLeft: "10px" }} />
                    ) : (
                      <BiChevronDown size={24} style={{ marginLeft: "10px" }} />
                    )}
                  </>
                ) : null}
              </Box>
            </MenuButton>
            {supportedChain.length > 1 ? (
              <MenuList
                style={{ position: "relative", zIndex: 11 }}
                sx={{
                  background: "#122126",
                  border: "2px solid rgba(255, 255, 255, 0.70)",
                  boxShadow: "0px 4px 4px 0px rgba(64, 64, 64, 0.20)",
                }}
                minW={{ base: "200px", sm: "340px" }}
                borderRadius={{ base: "12px" }}
              >
                {supportedChain.map((e, index) => {
                  return <ChainItem data={e} key={`chain-items-${index}`} />;
                })}
              </MenuList>
            ) : null}
          </>
        )}
      </Menu>
    </>
  );
};

export default NetWorkButton;
