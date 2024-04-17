import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import depositBGLightStage from "assets/img/deposit-bg-light-stage.png";
import AppLogoText from "assets/img/app-logo-text.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import { IoMdClose } from "react-icons/io";
import { AppIcon, AzeroIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
// import betaz_token from "utils/contracts/betaz_token_calls";
import sale_pool from "utils/contracts/sale_pool_calls";
import betaz_core from "utils/contracts/betaz_core_calls";
import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { formatTokenBalance } from "utils";
import { convertTimeStampToNumber } from "utils";
import CommonButton from "components/button/commonButton";
import useInterval from "hooks/useInterval";
import { fetchBuyStatus } from "store/slices/substrateSlice";
import BETAZCountDown from "components/countdown/CountDown";
import BuyTokenButton from "components/button/buyTokenButton";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";
import { formatNumDynDecimal } from "utils";
import { useQuery } from "react-query";
import PandoraCloseButton from "assets/img/PandoraCloseButton.svg";
import PandoraInput from "../components/Input";
import { useModal } from "contexts/useModal";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraWithdrawModal = ({ visible, onClose }) => {
  const { setModalPandoraWithdrawVisible } = useModal();
  const isMobile = useCheckMobileScreen(992);
  return (
    <>
      <Modal isOpen={visible} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          className="deposit-modal-container"
          maxW={{
            base: " !important",
            sm: "615px !important",
          }}
          overflow="hidden"
          borderRadius={{ base: "8px" }}
          // containerProps={{ justifyContent: 'flex-end', paddingRight: '60px', paddingTop: "120px" }}
        >
          <ModalBody
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            padding="0px"
            justifyContent={isMobile ? "center" : "unset"}
            alignItems={isMobile ? "center" : "unset"}
          >
            <Box
              className="deposit-modal-container"
              w={{ base: "100%", md: "600px" }}
              // w={{ base: "100%", md: "50%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              padding={{ base: "12px" }}
            >
              <Box
                className="pandora-btn-close"
                position="absolute"
                top="0px"
                right="0px"
                zIndex={3}
                onClick={() => setModalPandoraWithdrawVisible(false)}
              >
                <Image
                  src={PandoraCloseButton}
                  alt=""
                  verticalAlign="middle"
                  maxW="100%"
                />
              </Box>
              <Box w="100%" h="100%" className="pandora-modal-overlay"></Box>
              <Box
                w="100%"
                className="pandora-modal-container"
                display="flex"
                flexDirection="column"
                gap="24px"
              >
                <Text className="pandora-modal-text-title" color="#FFA000">
                  WITHDRAW
                </Text>
                <PandoraInput
                  text={"YOUR HOLD AMOUNT BALANCE"}
                  topRightIcon={true}
                  value={"123123123"}
                />
                <PandoraInput
                  text={"HOLD AMOUNT"}
                  value={"123123123"}
                  bottomLeftIcon={true}
                />

                <Button
                  fontWeight="600"
                  fontStyle="normal"
                  fontSize={{ base: "18px" }}
                >
                  WITHDRAW HOLD AMOUNT
                </Button>

                <Box>
                  <Text textAlign="center">
                    By Clicking your agree with our
                  </Text>
                  <Text
                    className="linear-text-color-01 term-aggreement-text"
                    textAlign="center"
                  >
                    Terms and Conditions, Privacy Policy
                  </Text>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PandoraWithdrawModal;
