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
import PandoraItem from "assets/img/PandoraItem.png";
import PandoraItemBG from "assets/img/PandoraItemBG.png";
import PandoraInput from "../components/Input";
import { useModal } from "contexts/useModal";
import EffectIcon from "assets/img/LightIcon1.png";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useTicket } from "contexts/useSelectTicket";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;
const dataTest = [
//   { ticketId: 1 },
//   { ticketId: 2 },
//   { ticketId: 3 },
//   { ticketId: 4 },
//   { ticketId: 5 },
//   { ticketId: 6 },
];
const PandoraSelectTicketModal = ({ visible, onClose }) => {
  const { setModalPandoraSelectTicketVisible } = useModal();
  const isMobile = useCheckMobileScreen(992);
  const {ticketId, setTicketId} = useTicket();
  return (
    <>
      <Modal isOpen={visible} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          className="deposit-modal-container"
          maxW={{
            base: " !important",
            sm: "calc(100vw - 120px) !important",
          }}
          overflow="hidden"
          borderRadius={{ base: "12px" }}
          // containerProps={{ justifyContent: 'flex-end', paddingRight: '60px', paddingTop: "120px" }}
        >
          <ModalBody padding="0px">
            <Text
              className="pandora-modal-select-ticket-text-title"
              mb={"16px"}
              textAlign={"center"}
            >
              SELECT TICKETS
            </Text>
            <Box
              className="deposit-modal-container"
              w={{ base: "100%", md: "100%" }}
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
                top="-1px"
                right="0px"
                zIndex={3}
                onClick={() => setModalPandoraSelectTicketVisible(false)}
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
                paddingX={"0px"}
              >
                {dataTest?.length ? (
                  <Flex justifyContent="space-between" alignItems={"center"}>
                    <MdOutlineArrowBackIosNew size={"84px"} color="#1BECA6" />
                    {dataTest?.map((item) => (
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        <Box
                          className="PandoraTicketCard"
                          border={"2px solid #00D5C4"}
                          padding={"6px"}
                          borderRadius={"6px"}
                          background={
                            item?.ticketId === ticketId
                              ? "radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
                              : "radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
                          }
                          //   background="radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
                          //   background="radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
                          w={"176px"}
                          position={"relative"}
                          cursor={"pointer"}
                          onClick={() => {
                            if (item?.ticketId !== ticketId)
                            setTicketId(item?.ticketId);
                            else {
                                setTicketId(0);
                            }
                          }}
                        >
                          <Image
                            src={EffectIcon}
                            alt=""
                            position="absolute"
                            top="140px"
                            right="-86px"
                            w="200px"
                            transform={"rotate(-90deg)"}
                            zIndex={4}
                            opacity={item?.ticketId === ticketId ? 1 : 0}
                          />
                          <Image
                            src={EffectIcon}
                            alt=""
                            position="absolute"
                            top="-26px"
                            left="-60px"
                            w="200px"
                            zIndex={4}
                            opacity={item?.ticketId === ticketId ? 1 : 0}
                          />
                          <Box
                            w={"100%"}
                            borderRadius={"6px"}
                            overflow={"hidden"}
                            position={"relative"}
                          >
                            <Image src={PandoraItemBG} alt="" />
                            <Image
                              src={PandoraItem}
                              alt=""
                              position={"absolute"}
                              top={"50%"}
                              left={"50%"}
                              transform={"translate(-50%, -50%)"}
                              w={"90%"}
                            />
                          </Box>
                          <Box>
                            <Text
                              textTransform={"uppercase"}
                              fontWeight={"700"}
                              color={"black"}
                              fontStyle="italic"
                            >
                              Pandora secret box #{item.ticketId}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ))}

                    <MdOutlineArrowForwardIos size={"84px"} color="#1BECA6" />
                  </Flex>
                ) : (
                  <Text className="pandora-modal-text-title" color="#FFA000">
                    You don't own any tickets
                  </Text>
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PandoraSelectTicketModal;
