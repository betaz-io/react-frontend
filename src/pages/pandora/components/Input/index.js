import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import EffectIcon from "assets/img/LightIcon1.png";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useModal } from "contexts/useModal";

function PandoraInput(props) {
  const {
    textSx,
    type,
    lightIcons,
    value,
    text,
    textXlColor,
    textXl,
    topLeftIcon,
    topRightIcon,
    bottomLeftIcon,
    bottomRightIcon,
    onChange,
    onClick,
    maxLength,
    disabled,
    opacity,
    onClickMax,
    showMax,
    ...rest
  } = props;

  return (
    <Box
      className=""
      position="relative"
      border="1px solid #1BECA7"
      borderRadius="8px"
      padding="12px"
      backgroundColor="#122126"
      onClick={onClick}
      cursor={"pointer"}
      w={"100%"}
    >
      {text && <Text className="pandora-title-input">{text}</Text>}
      <Image
        opacity={topLeftIcon ? 1 : 0}
        src={EffectIcon}
        position="absolute"
        top="-36px"
        left="0"
        w="240px"
        loading="lazy"
        alt="images"
      />
      <Image
        opacity={topRightIcon ? 1 : 0}
        src={EffectIcon}
        alt="images"
        position="absolute"
        top="-36px"
        right="0px"
        w="240px"
        loading="lazy"
      />
      <Image
        opacity={bottomLeftIcon ? 1 : 0}
        src={EffectIcon}
        alt="images"
        position="absolute"
        bottom="-36px"
        left="0px"
        w="240px"
        loading="lazy"
      />
      <Image
        opacity={bottomRightIcon ? 1 : 0}
        src={EffectIcon}
        alt="images"
        position="absolute"
        bottom="-36px"
        right="0px"
        w="240px"
        loading="lazy"
      />
      {textXl ? (
        <Text
          className="pandora-modal-text-title"
          fontSize={{ base: "20px", sm: "36px" }}
          color={textXlColor}
        >
          {textXl}
        </Text>
      ) : (
        <Flex className="pandora-box-amount-input">
          <Input
            className="pandora-text-input"
            focusBorderColor="transparent"
            sx={{
              border: "0px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "24px",
            }}
            onChange={onChange}
            value={value}
            placeholder="----------"
            maxLength={maxLength}
            type={type}
            disabled={disabled}
            opacity={opacity}
          />
          {showMax && (
            <Box px={"12px"} py="8px" onClick={onClickMax}>
              <Text color={"#1beca7"} fontWeight={"600"}>
                MAX
              </Text>
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
}

export default PandoraInput;
