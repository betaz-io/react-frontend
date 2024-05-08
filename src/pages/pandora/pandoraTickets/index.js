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
import pandora_pool_contract from "utils/contracts/pandora_pool";
import pandora_psp34_contract from "utils/contracts/pandora_psp34";
import pandora_pool from "utils/contracts/pandora_pool_calls";
import { formatNumDynDecimal } from "utils";
import { useQuery } from "react-query";
import PandoraCloseButton from "assets/img/PandoraCloseButton.svg";
import PandoraInput from "../components/Input";
import { useModal } from "contexts/useModal";
import PandoraCountDownSelectTicket from "components/countdown/PandoraCountDownSelectTicket";
import { useTicket } from "contexts/useSelectTicket";
import { useWallet } from "contexts/useWallet";
import { execContractTx } from "utils/contracts";
import { delay } from "utils";
import { clientAPI } from "api/client";
import { getNextDayTime } from "utils";
import { useMyTicketList } from "hooks/useMyTicketList";
import { APICall } from "api/client";
import { usePandoraYourBetHistory } from "hooks/usePandoraYourBetHistory";
import { fetchTotalPlayer } from "store/slices/pandoraNftSlice";
import { getNextHourTime } from "utils";
import ClearIcon from "assets/img/broom.png";
import { MdOutlineClear } from "react-icons/md";
import { convertToFixedLengthNumberString } from "utils";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraTicket = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const isMobile = useCheckMobileScreen(992);
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { sessionId } = useSelector((s) => s.pandoraNft);
  const { api } = useWallet();
  const { ticketId, setTicketId } = useTicket();
  const [betNumberVal, setBetNumberVal] = useState("000000");
  const [maxBet, setMaxBet] = useState(100000);
  const [isLoading, setIsLoading] = useState(false);

  const { refetch: refetchMyTicketList } = useMyTicketList(
    currentAccount?.address
  );

  const { refetch: refetchPandoraHistoryData } =
    usePandoraYourBetHistory(currentAccount);

  const {
    setModalPandoraWithdrawVisible,
    setModalPandoraSelectTicketVisible,
    modalPandoraYourBetHistoryVisible,
    setModalPandoraYourBetHistoryVisible,
  } = useModal();

  const handleOpenModalSelectTicket = () =>
    setModalPandoraSelectTicketVisible(true);

  const onChangeBetNumber = useCallback((e) => {
    const { value } = e.target;
    // const reg = /^\d{0,6}$/;
    // let betValue = 0;
    // if ((!isNaN(value) && reg.test(value)) || value === "") {
    //   betValue = parseFloat(value);
    //   if (betValue < 0) betValue = 1;
    //   if (betValue > Number(maxBet)) {
    //     toast.error("Max Bet is " + Number(maxBet));
    //     setBetNumberVal(Number(maxBet));
    //   } else {
    //     setBetNumberVal(value);
    //   }
    // } else setBetNumberVal("000000");
    // if (value === "") setBetNumberVal(maxBet);
    if (!isNaN(value)) {
      if (value.length <= 6) {
        const truncatedInput = value.slice(0, 6);
        const convertNumber = convertToFixedLengthNumberString(
          truncatedInput,
          6
        );
        setBetNumberVal(convertNumber);
      } else if (Number(value) > 1000000) {
        setBetNumberVal(value.slice(0, 6));
      } else {
        setBetNumberVal(value.slice(-6));
      }
    }
    if (value === "") setBetNumberVal("0000000");
  });

  const loadMaxBet = async () => {
    let max_Bet = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getMaxBetNumber"
    );
    max_Bet = max_Bet?.toHuman().Ok?.replaceAll(",", "");
    if (maxBet != max_Bet) {
      setMaxBet(max_Bet);
    }
  };

  useEffect(() => {
    if (api) loadMaxBet();
  }, [api, currentAccount]);

  const onPlay = async () => {
    if (!currentAccount?.address) {
      toast.error("Please connect your wallet and select an account");
      return;
    }

    if (!ticketId) {
      toast.error("invalid Ticket!");
      return;
    }

    if (betNumberVal === "") {
      toast.error("invalid bet amount!");
      return;
    }

    if (!sessionId) {
      toast.error("invalid sessionId!");
      return;
    }

    setIsLoading(true);
    const betNumber = Number(betNumberVal);
    let owner = await execContractQuery(
      defaultCaller,
      pandora_psp34_contract.CONTRACT_ABI,
      pandora_psp34_contract.CONTRACT_ADDRESS,
      0,
      "psp34::ownerOf",
      { u64: ticketId }
    );

    owner = owner?.toHuman().Ok;
    if (owner !== currentAccount?.address) {
      toast.error("Not owner ticket!");
      setIsLoading(false);
      return;
    }

    let sessionInfo = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getBetSession",
      sessionId
    );

    let sessionStatus = sessionInfo?.toHuman().Ok?.status;
    if (sessionStatus !== "Processing") {
      toast.error("Session not Processing!");
      setIsLoading(false);
      return;
    }

    const toastHandleApproved = toast.loading("Approved ...");
    let approved = await execContractTx(
      currentAccount,
      pandora_psp34_contract.CONTRACT_ABI,
      pandora_psp34_contract.CONTRACT_ADDRESS,
      0,
      "psp34::approve",
      pandora_pool_contract.CONTRACT_ADDRESS,
      {
        u64: ticketId,
      },
      true
    );
    toast.dismiss(toastHandleApproved);
    if (approved) {
      const toastHandlePlay = toast.loading("Playing ...");
      let played = await execContractTx(
        currentAccount,
        pandora_pool_contract.CONTRACT_ABI,
        pandora_pool_contract.CONTRACT_ADDRESS,
        0,
        "pandoraPoolTraits::play",
        sessionId,
        betNumber,
        {
          u64: ticketId,
        }
      );
      toast.dismiss(toastHandlePlay);
      if (played) {
        const fetchNft = toast.loading("Fetching Nft data ...");
        await APICall.askBeUpdateNftData({
          collection_address: pandora_psp34_contract.CONTRACT_ADDRESS,
          token_id: ticketId,
        });
        await clientAPI("post", "/updateNFTQueue", {
          ticketId: ticketId,
        });
        await delay(3000);
        refetchPandoraHistoryData();
        refetchMyTicketList();
        dispatch(fetchTotalPlayer(sessionId));
        toast.dismiss(fetchNft);
        setIsLoading(false);
        toast.success("Playing sussesfully!");
      } else {
        toast.error("Cannot Play!");
        setIsLoading(false);
        return;
      }
    } else {
      toast.error("Cannot approve!");
      setIsLoading(false);
      return;
    }

    setTicketId(0);
    setIsLoading(false);
  };

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
                <Text
                  color={"#FFA000"}
                  fontWeight={"500"}
                  fontSize={"24px"}
                  mb="6px"
                >
                  YOUR TICKET SELECTED
                </Text>
                <Box display={"flex"} gap={"12px"}>
                  <PandoraInput
                    textXl={ticketId ? ticketId : "----------"}
                    textXlColor={"white"}
                    onClick={handleOpenModalSelectTicket}
                  />
                  <Button
                    h={"72px"}
                    onClick={() => setTicketId(0)}
                    paddingX={"8px"}
                    display={ticketId ? "block" : "none"}
                  >
                    <MdOutlineClear
                      size={"54px"}
                      color="#C62828"
                      style={{ marginRight: "8px" }}
                    />
                  </Button>
                </Box>
              </Box>
              <Box display={"flex"} gap={"12px"}>
                {/* <Text
                  color={"#FFA000"}
                  fontWeight={"500"}
                  fontSize={"24px"}
                  mb="6px"
                >
                  YOUR NUMBER
                </Text> */}
                <PandoraInput
                  text={"YOUR NUMBER"}
                  onChange={onChangeBetNumber}
                  value={betNumberVal}
                  topRightIcon={true}
                  bottomLeftIcon={true}
                  // maxLength={6}
                />
              </Box>
              <Text
                color="#1BE8AD"
                fontSize="40px"
                fontStyle="normal"
                fontWeight="500"
                textAlign="center"
              >
                Session #{sessionId} finisher in:
              </Text>

              <Box minW={{ base: "90%" }} mx="auto">
                <PandoraCountDownSelectTicket date={getNextHourTime(4)} />
              </Box>
              <Flex gap="24px">
                <Button
                  fontWeight="600"
                  fontStyle="normal"
                  fontSize={{ base: "16px" }}
                  w="100%"
                  onClick={() => setModalPandoraYourBetHistoryVisible(true)}
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
              <CommonButton
                text="BET NOW"
                onClick={onPlay}
                sx={{
                  fontWeight: "600",
                  fontStyle: "normal",
                  fontsize: { base: "18px" },
                  background:
                    "linear-gradient(90deg, #B88510 7.25%, #FFB817 40.04%, #FFC133 46.68%, #FFCE61 58.58%, #FFD77D 67.78%, #FFDA87 73.1%, #FFFBF2 94.29%) !important",
                }}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PandoraTicket;
