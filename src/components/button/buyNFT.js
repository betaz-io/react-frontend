import React from "react";
import { Button, Link, Tooltip, Box } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { IoCartOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function BuyNFT() {
  return (
    <Box
      cursor={"pointer"}
      position={"fixed"}
      right={{ base: "20px", sm: "32px" }}
      bottom={{ base: "16px", sm: "24px" }}
      w={"max-content"}
      padding={"8px"}
      background={
        "linear-gradient(90deg, #B88510 0%, #FFB817 38%, #FFC133 45%, #FFCE61 59%, #FFD77D 70%, #FFDA87 76%, #FFFBF2 100%)"
      }
      textAlign={"center"}
      borderRadius={"12px"}
      zIndex={"99999999999999999999"}
      _hover={{
        background:
          "linear-gradient(90deg, #B88510 0%, #FFB817 38%, #FFC133 45%, #FFCE61 59%, #FFD77D 70%, #FFDA87 76%, #FFFBF2 100%)",
        color: "white",
      }}
    >
      <Tooltip label="Get Your NFT!" placement="left-start" left={"-8px"}>
        <Link
          target="_blank"
          href="https://a0-test.artzero.io/collection/5GSQJWgt4jTkBqZZfvF6ARCoxYZ9XygmYNLLautZLaBqx8kc?is_for_sale=true"
          textDecoration={"none"}
        >
          <IoCartOutline size={"36px"} />
        </Link>
      </Tooltip>
    </Box>
  );
}

export default BuyNFT;
