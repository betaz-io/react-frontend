import React from "react";
import { Button } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";

function CommonButton(props) {
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

  const { currentAccount } = useSelector((s) => s.substrate);
  const { connectModalVisible, setConnectModalVisible } = useModal();

  if (currentAccount?.address)
    return (
      <Button
        {...rest}
        type={type}
        sx={sx}
        backgroundColor={backgroundColor}
        color={color}
        onClick={onClick}
        isDisabled={isDisabled}
        isLoading={!isDisabled && isLoading ? true : false}
        w={{ base: "100%", sm: "unset" }}
        spinner={<ClipLoader color="#7ae7ff" size={14} loading />}
      >
        {text}
      </Button>
    );
  else
    return (
      <Button onClick={() => setConnectModalVisible(true)}>
        Connect wallet now
      </Button>
    );
}

export default CommonButton;
