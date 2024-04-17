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
import PandoraCountDownSelectTicket from "components/countdown/PandoraCountDownSelectTicket";
import { useTicket } from "contexts/useSelectTicket";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraTicket = ({ visible, onClose }) => {
  const isMobile = useCheckMobileScreen(992);
  const {ticketId, setTicketId} = useTicket();

  const { setModalPandoraWithdrawVisible, setModalPandoraSelectTicketVisible } =
    useModal();

  const handleOpenModalSelectTicket = () =>
    setModalPandoraSelectTicketVisible(true);
  return (
    <>
      <Box position="absolute" top="0" right="0" zIndex={2}>
        <Box className="pandora-ticket-wrapper">
          <Box
            w="100%"
            h="100%"
            className="pandora-modal-ticket-overlay"
            zIndex="0"
          ></Box>
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
              w="100%"
              className="pandora-modal-container"
              display="flex"
              flexDirection="column"
              gap="24px"
            >
              <PandoraInput
                textXl={"SELECT TICKETS"}
                topRightIcon={true}
                bottomLeftIcon={true}
                textXlColor={"#FFA000"}
                onClick={handleOpenModalSelectTicket}
              />
              <Box>
                <Text color={"#FFA000"} fontWeight={"500"} fontSize={"24px"} mb="6px">YOUR NUMBER</Text>
                <PandoraInput
                  textXl={ticketId ? ticketId : "----------"}
                  textXlColor={"white"}
                />
              </Box>
              <Text
                color="#1BE8AD"
                fontSize="40px"
                fontStyle="normal"
                fontWeight="500"
                textAlign="center"
              >
                Finisher in:
              </Text>

              <Box minW={{ base: "90%" }} mx="auto">
                <PandoraCountDownSelectTicket date={1713427995000} />
              </Box>
              <Flex gap="24px">
                <Button
                  fontWeight="600"
                  fontStyle="normal"
                  fontSize={{ base: "16px" }}
                  w="100%"
                >
                  YOUR BET
                </Button>
                <Button
                  fontWeight="600"
                  fontStyle="normal"
                  fontSize={{ base: "16px" }}
                  w="100%"
                  onClick={() => setModalPandoraWithdrawVisible(true)}
                >
                  WITHDRAW WINNING AMOUNT
                </Button>
              </Flex>
              <Button
                fontWeight="600"
                fontStyle="normal"
                fontSize={{ base: "18px" }}
                background="linear-gradient(90deg, #B88510 7.25%, #FFB817 40.04%, #FFC133 46.68%, #FFCE61 58.58%, #FFD77D 67.78%, #FFDA87 73.1%, #FFFBF2 94.29%) !important"
                sx={{
                  _hover: {
                    background: "white !important",
                  },
                }}
              >
                BET NOW
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PandoraTicket;
