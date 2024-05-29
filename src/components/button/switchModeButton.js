import React from "react";
import { Button } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { useLocation, useNavigate } from "react-router-dom";

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
      <Button
        {...rest}
        type={type}
        sx={sx}
        backgroundColor={backgroundColor}
        color={color}
        onClick={() => handleNavigate(paths.app)}
        isDisabled={isDisabled}
      >
        Launch App
      </Button>
    );
  else
    return (
      <Button
        {...rest}
        type={type}
        sx={sx}
        backgroundColor={backgroundColor}
        color={color}
        onClick={() => handleNavigate(paths.pandora)}
        isDisabled={isDisabled}
      >
        Pandora Mode
      </Button>
    );
}

export default SwitchModeButton;
