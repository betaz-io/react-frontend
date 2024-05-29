import React from "react";
import { Button, Tooltip, Box, Image } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import BetModeIcon from "assets/img/icons/betModeIcon.png";
import PandoraModeIcon from "assets/img/icons/pandoraModeIcon.png";

function SwitchModeButton(props) {
  const {
    type,
    text,
    onClick,
    isLoading,
    isDisabled,
    backgroundColor,
    color,
    sx,
    ...rest
  } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const paths = {
    app: "/app",
    pandora: "/pandora",
  };

  const handleNavigate = (path) => navigate(path);

  if (["/pandora"].includes(location.pathname))
    return (
      <Box
        cursor={"pointer"}
        position={"fixed"}
        right={{ base: "20px", sm: "32px" }}
        bottom={{ base: "92px" }}
        w={"max-content"}
        padding={"8px"}
        background={
          "linear-gradient(90deg, #B88510 0%, #FFB817 38%, #FFC133 45%, #FFCE61 59%, #FFD77D 70%, #FFDA87 76%, #FFFBF2 100%)"
        }
        textAlign={"center"}
        borderRadius={"12px"}
        zIndex={"999999999999999"}
        _hover={{
          background: "#E2E8F0",
          color: "white",
        }}
        onClick={() => handleNavigate(paths.app)}
      >
        <Tooltip label="Launch App" placement="left-start" left={"-8px"}>
          <Image
            src={BetModeIcon}
            height={"36px"}
            verticalAlign={"middle"}
            alt="logo"
            loading="lazy"
          />
        </Tooltip>
      </Box>
    );
  else
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
          background: "#E2E8F0",
          color: "white",
        }}
        onClick={() => handleNavigate(paths.pandora)}
      >
        <Tooltip label="Launch Pandora Mode" placement="left-start" left={"-8px"}>
          <Image
            src={PandoraModeIcon}
            height={"36px"}
            verticalAlign={"middle"}
            alt="logo"
            loading="lazy"
          />
        </Tooltip>
      </Box>
    );
}

export default SwitchModeButton;
