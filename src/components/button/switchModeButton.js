import React from "react";
import { Button, Tooltip, Box, Image, Flex, Text } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import BetModeIcon from "assets/img/icons/betModeIcon.png";
import PandoraModeIcon from "assets/img/icons/pandoraModeIcon.png";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";

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

  const isMobile = useCheckMobileScreen(480);

  if (["/pandora"].includes(location.pathname))
    return (
      <Button
        className="btn-switch"
        padding={"10px 12px"}
        borderRadius={"12px"}
        background={"#0D171B"}
        border={"1px solid transparent"}
        onClick={() => handleNavigate(paths.app)}
      >
        <Flex alignItems={"center"} gap={2}>
          <Image
            src={BetModeIcon}
            height={"28px"}
            verticalAlign={"middle"}
            alt="logo"
            loading="lazy"
          />

          {!isMobile && <Text>Lucky Mode</Text>}
        </Flex>
      </Button>
    );
  else
    return (
      <Button
        className="btn-switch"
        padding={"10px 12px"}
        border={"1px solid 1BECA6"}
        background={"#0D171B"}
        borderRadius={"12px"}
        onClick={() => handleNavigate(paths.pandora)}
      >
        <Flex alignItems={"center"} gap={2}>
          <Image
            src={PandoraModeIcon}
            height={"28px"}
            verticalAlign={"middle"}
            alt="logo"
            loading="lazy"
          />

          {!isMobile && <Text>Pandora Mode</Text>}
        </Flex>
      </Button>
    );
}

export default SwitchModeButton;
