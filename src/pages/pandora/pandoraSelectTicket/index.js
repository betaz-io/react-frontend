import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Image,
  Input,
  Link,
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
  MdOutlineClear,
} from "react-icons/md";
import { MdClear } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { useTicket } from "contexts/useSelectTicket";
import { useMyTicketList } from "hooks/useMyTicketList";
import { GrPowerReset } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraSelectTicketModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { setModalPandoraSelectTicketVisible } = useModal();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [uiPage, setUIPage] = useState(1);
  const { ticketId, setTicketId } = useTicket();
  const [isLoading, setLoading] = useState(false);

  const {
    myTicketList: nftsData,
    isLoading: isLoadingMyTicketList,
    refetch: refetchMyTicketList,
    isRefetching: isRefetchingMyTicketList,
    prevPage: handlePrev,
    nextPage: handleNext,
    currentPage,
  } = useMyTicketList(currentAccount?.address);

  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(nftsData.length / 6);
    if (currentPage <= totalPages) handleNext();
    refetchMyTicketList();
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) handlePrev();
    refetchMyTicketList();
  });

  const isMobile = useCheckMobileScreen(480);
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
          <ModalBody
            padding="0px"
            marginLeft={isMobile && "16px"}
            marginRight={isMobile && "16px"}
          >
            <Text
              className="pandora-modal-select-ticket-text-title"
              mb={"16px"}
              textAlign={"center"}
              fontSize={isMobile && "36px"}
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
                top="0px"
                right="0px"
                zIndex={3}
                onClick={() => setModalPandoraSelectTicketVisible(false)}
                color={"white"}
                background={"#00D5C4"}
                borderBottomLeftRadius={"8px"}
                borderTopRightRadius={"8px"}
                sx={{
                  _hover: {
                    background: "#FC0000",
                  },
                }}
              >
                <IoCloseSharp size={"36px"} />
              </Box>

              {/* button pev & next */}
              {isMobile && (
                <Box
                  background={"#00D5C4"}
                  borderRadius={"12px"}
                  py={"12px"}
                  position={"absolute"}
                  top={"50%"}
                  left={"-8px"}
                  transform={"translateY(-50%)"}
                >
                  <MdOutlineArrowBackIosNew
                    size={"36px"}
                    color="white"
                    onClick={previousPage}
                  />
                </Box>
              )}
              {isMobile && (
                <Box
                  background={"#00D5C4"}
                  borderRadius={"12px"}
                  py={"12px"}
                  position={"absolute"}
                  top={"50%"}
                  right={"-8px"}
                  transform={"translateY(-50%)"}
                >
                  <MdOutlineArrowForwardIos
                    size={"36px"}
                    color="white"
                    onClick={previousPage}
                  />
                </Box>
              )}

              <Box w="100%" h="100%" className="pandora-modal-overlay"></Box>
              <Box
                w="100%"
                className="pandora-modal-container"
                gap="24px"
                paddingX={"0px"}
                maxH={"80vh"}
              >
                <Box
                  px={"48px"}
                  py={"12px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  gap={"12px"}
                >
                  {ticketId > 0 && (
                    <CommonButton
                      text={<IoMdCheckmark size={"24px"} />}
                      isLoading={isRefetchingMyTicketList}
                      isDisabled={isRefetchingMyTicketList}
                      onClick={() => {
                        if (ticketId) onClose();
                        else setTicketId(0);
                      }}
                      className="btn-refetch"
                    ></CommonButton>
                  )}
                  {ticketId > 0 && (
                    <CommonButton
                      text={<MdClear size={"24px"} />}
                      isLoading={isRefetchingMyTicketList}
                      isDisabled={isRefetchingMyTicketList}
                      onClick={() => setTicketId(0)}
                      className="btn-refetch"
                    ></CommonButton>
                  )}
                  <CommonButton
                    text={<GrPowerReset size={"24px"} />}
                    isLoading={isRefetchingMyTicketList}
                    isDisabled={isRefetchingMyTicketList}
                    onClick={() => refetchMyTicketList()}
                    className="btn-refetch"
                  ></CommonButton>
                </Box>
                <Flex
                  justifyContent="space-between"
                  alignItems={"center"}
                  overflow={"hidden"}
                  maxW={"100%"}
                  px={isMobile ? "24px" : "16px"}
                >
                  {!isMobile && (
                    <MdOutlineArrowBackIosNew
                      size={"84px"}
                      color="#1BECA6"
                      onClick={previousPage}
                      cursor={"pointer"}
                    />
                  )}
                  <Flex
                    w={"100%"}
                    flexWrap={"wrap"}
                    gap={"12px"}
                    justifyContent={"center"}
                  >
                    {isRefetchingMyTicketList ? (
                      <Flex justifyContent={"center"} gap={"12px"}>
                        <CircularProgress isIndeterminate color="#1beca6" />
                        <Text
                          className="pandora-modal-text-title"
                          color="#FFA000"
                        >
                          Loading ..........
                        </Text>
                      </Flex>
                    ) : nftsData?.length ? (
                      nftsData?.map((item) => (
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
                              item?.nftId === ticketId
                                ? "radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
                                : "radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
                            }
                            maxW={isMobile ? "120px" : "176px"}
                            position={"relative"}
                            cursor={"pointer"}
                            onClick={() => {
                              if (item?.nftId !== ticketId)
                                setTicketId(item?.nftId);
                              else setTicketId(0);
                            }}
                            onDoubleClick={() => {
                              setTicketId(item?.nftId);
                              onClose();
                            }}
                          >
                            <Image
                              src={EffectIcon}
                              alt="images"
                              position="absolute"
                              top="140px"
                              right="-86px"
                              w="200px"
                              transform={"rotate(-90deg)"}
                              zIndex={4}
                              opacity={item?.nftId === ticketId ? 1 : 0}
                              loading="lazy"
                            />
                            <Image
                              src={EffectIcon}
                              alt="images"
                              position="absolute"
                              top="-26px"
                              left="-60px"
                              w="200px"
                              zIndex={4}
                              opacity={item?.nftId === ticketId ? 1 : 0}
                              loading="lazy"
                            />
                            <Box
                              w={"100%"}
                              borderRadius={"6px"}
                              overflow={"hidden"}
                              position={"relative"}
                            >
                              <Image
                                src={PandoraItemBG}
                                alt="pandora-item-bg"
                                loading="lazy"
                              />
                              <Image
                                src={PandoraItem}
                                alt="pandora-item-bg"
                                position={"absolute"}
                                top={"50%"}
                                left={"50%"}
                                transform={"translate(-50%, -50%)"}
                                w={"90%"}
                                loading="lazy"
                              />
                            </Box>
                            <Box>
                              <Text
                                textTransform={"uppercase"}
                                fontWeight={"700"}
                                color={"black"}
                                fontStyle="italic"
                                fontSize={isMobile && "12px"}
                              >
                                Pandora secret box #{item?.nftId}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Text
                        className="pandora-modal-text-title"
                        color="#FFA000"
                      >
                        You don't have any tickets.{" "}
                        <Link
                          color={"#1BECA6"}
                          target="_blank"
                          href="https://a0-test.artzero.io/collection/5GSQJWgt4jTkBqZZfvF6ARCoxYZ9XygmYNLLautZLaBqx8kc?is_for_sale=true"
                        >
                          Get yours now!
                        </Link>
                      </Text>
                    )}
                  </Flex>
                  {!isMobile && (
                    <MdOutlineArrowForwardIos
                      size={"84px"}
                      color="#1BECA6"
                      onClick={nextPage}
                      cursor={"pointer"}
                    />
                  )}
                </Flex>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PandoraSelectTicketModal;
