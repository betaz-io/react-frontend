import React from "react";
import { Button, Link, Tooltip, Box } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function BuyNFT() {
  return (
    <Box
      position={"fixed"}
      right={{base:"20px", sm:"32px",}}
      bottom={{base:"16px", sm:"24px",}}
      w={"max-content"}
      padding={"8px"}
      background={"linear-gradient(180deg, #1bbff4 0%, #1beca7 100%)"}
      textAlign={"center"}
      borderRadius={"12px"}
      zIndex={"99999999999999999999"}
      _hover={{
        background: "#E2E8F0",
        color: "black",
      }}
    >
      <Tooltip label="Get Your NFT!" placement='left-start'>
        <Link
          target="_blank"
          href="https://a0-test.artzero.io/collection/5GSQJWgt4jTkBqZZfvF6ARCoxYZ9XygmYNLLautZLaBqx8kc?is_for_sale=true"
          textDecoration={"none"}
        >
          <FaShoppingCart size={"24px"} />
        </Link>
      </Tooltip>
    </Box>
  );
}

export default BuyNFT;
