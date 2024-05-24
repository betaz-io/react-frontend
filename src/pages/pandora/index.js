import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState, useCallback, useEffect } from "react";
import "./styles.css";
import FloorImage from "assets/img/floor.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import useInterval from "hooks/useInterval";
import { useWallet } from "contexts/useWallet";
import { clientAPI } from "api/client";
import {
  fetchUserBalance,
  fetchRollNumbers,
  fetchBalance,
  fetchRates,
} from "store/slices/substrateSlice";
import { delay } from "utils";
import { AppIcon, TokenIcon, AzeroIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import axios from "axios";
import { useQuery } from "react-query";
import PandoraNumber from "./pandoraNumber";
import PandoraBGCoin from "assets/img/PandoraBGCoin.png";
import EffectIcon from "assets/img/LightIcon1.png";
import { useModal } from "contexts/useModal";
import PandoraWithdrawModal from "./pandoraWithdraw";
import PandoraTicket from "./pandoraTickets";
import PandoraBetHistoryModal from "./pandoraBetHistoryModal";
import PandoraHistoryButton from "./pandoraHistoryButton";
import PandoraSelectTicketModal from "./pandoraSelectTicket";
import PandoraYourBetHistoryModal from "./pandoraYourBet";
import { PlayersIcon } from "components/icons";
import { AzIcon } from "components/icons";
import { execContractQuery } from "utils/contracts";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import { convertToBalance } from "utils";
import { formatNumDynDecimal } from "utils";
import { fetchPandoraHoldAmountByPlayer } from "store/slices/pandoraNftSlice";
import { fetchTotalPlayer } from "store/slices/pandoraNftSlice";
import PandoraRewardHistoryModal from "./pandoraRewardHistory";
import PandoraTicketsModal from "./yourTicket";
import { fetchPandoraPoolAmount } from "store/slices/pandoraNftSlice";
import useWebSocket from "react-use-websocket";
import { fetchPandoraSession } from "store/slices/pandoraNftSlice";
import { usePandoraBetHistory } from "hooks/usePandoraBetHistory";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;
const wssUrl = process.env.REACT_APP_WSS_PANDORA_API || "ws://localhost:3011";

const PandoraMode = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const [holdAmountPlayer, setHoleAmountPlayer] = useState(0);

  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { sessionId, holdAmount, totalPlayers, pandoraPoolAmount } =
    useSelector((s) => s.pandoraNft);

  useEffect(() => {
    if (sessionId) dispatch(fetchTotalPlayer(sessionId));
  }, [sessionId]);

  useEffect(() => {
    if (api && currentAccount) {
      dispatch(fetchPandoraHoldAmountByPlayer(currentAccount));
      dispatch(fetchPandoraPoolAmount());
    }
  }, [currentAccount, api, sessionId]);

  const { refetch: refetchPandoraHistoryData } = usePandoraBetHistory();

  const {} = useWebSocket(wssUrl, {
    onOpen: () => console.log(`connected websocket ${wssUrl}`),
    onMessage: (event) => {
      const message = JSON.parse(event?.data);
      console.log({ message });
      if (message?.event == "Job Competed") {
        console.log("start refetch");
        if (api) {
          dispatch(fetchPandoraSession());
          refetchPandoraHistoryData();
          toast.success(`Wellcome session ${sessionId}`);
        }
      }
    },
    onClose: () => console.log(`disconnected websocket ${wssUrl}`),
    onError: (error) => {
      console.log(`Error from websocket ${wssUrl}`);
      console.log(error);
    },
    shouldReconnect: (closeEvent) => true,
  });

  const {
    modalPandoraWithdrawVisible,
    setModalPandoraWithdrawVisible,
    modalPandoraBetHistoryVisible,
    setModalPandoraBetHistoryVisible,
    modalPandoraSelectTicketVisible,
    setModalPandoraSelectTicketVisible,
    modalPandoraYourBetHistoryVisible,
    setModalPandoraYourBetHistoryVisible,
    modalPandoraRewardHistoryVisible,
    setModalPandoraRewardHistoryVisible,
    modalPandoraYourTicketVisible,
    setModalPandoraYourTicketVisible,
  } = useModal();

  const isMobile = useCheckMobileScreen(480);
  return (
    <>
      <SectionContainer>
        <Box
          w="100%"
          h="auto"
          mt={{ base: "0px", sm: "48px" }}
          position="relative"
        >
          <SimpleGrid
            columns={{ md: 1, xl: 2 }}
            spacingY={{ base: "24px" }}
          >
            <PandoraNumber />
            <Box
              className="section-pandora-right"
              position="relative"
              minH={isMobile && "650px"}
              w={"100%"}
            >
              <PandoraTicket />

              {/* modal */}
              <PandoraWithdrawModal
                visible={modalPandoraWithdrawVisible}
                onClose={() => {
                  setModalPandoraWithdrawVisible(false);
                }}
              />
              <PandoraSelectTicketModal
                visible={modalPandoraSelectTicketVisible}
                onClose={() => {
                  setModalPandoraSelectTicketVisible(false);
                }}
              />
              <PandoraYourBetHistoryModal
                isOpen={modalPandoraYourBetHistoryVisible}
                onClose={() => setModalPandoraYourBetHistoryVisible(false)}
              />
              <PandoraRewardHistoryModal
                isOpen={modalPandoraRewardHistoryVisible}
                onClose={() => setModalPandoraRewardHistoryVisible(false)}
              />
              <PandoraTicketsModal
                isOpen={modalPandoraYourTicketVisible}
                onClose={() => setModalPandoraYourTicketVisible(false)}
              />

              {/* bg img */}
              {!isMobile && (
                <Box
                  className="lucky-number-circle-image"
                  bgImage={PandoraBGCoin}
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  w={{ base: "280px", sm: "480px" }}
                  mx={{ base: "auto" }}
                  mt={{ base: "23%" }}
                  position="relative"
                >
                  <Image
                    position="absolute"
                    w="240px"
                    sx={{
                      top: "-6px",
                      left: "92px",
                    }}
                    src={EffectIcon}
                    className="pandora-effect-icon"
                    transform={"rotate(-45deg)"}
                    filter={"blur(3px) brightness(150%)"}
                    loading="lazy"
                  />
                  <Image
                    position="absolute"
                    w="200px"
                    sx={{
                      top: "150px",
                      left: "140px",
                    }}
                    src={EffectIcon}
                    className="pandora-effect-icon"
                    transform={"rotate(-45deg)"}
                    filter={"blur(3px) brightness(150%)"}
                    loading="lazy"
                  />
                  <Image
                    position="absolute"
                    w="200px"
                    sx={{
                      top: "155px",
                      left: "284px",
                    }}
                    src={EffectIcon}
                    className="pandora-effect-icon"
                    transform={"rotate(-45deg)"}
                    filter={"blur(3px) brightness(150%)"}
                    loading="lazy"
                  />
                </Box>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </SectionContainer>
      <SectionContainer
        sx={{
          marginTop: isMobile ? "48px" : "132px",
        }}
      >
        <Flex justifyContent={"center"} gap={"24px"} flexWrap={"wrap"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"18px"}
            flexWrap={"wrap"}
            alignItems={"center"}
            borderRadius={"12px"}
            border={"2px solid #00D5C4"}
            minW={"300px"}
            position={"relative"}
            overflow={"hidden"}
            padding={"8px"}
          >
            <Flex
              w="100%"
              h="100%"
              zIndex="1"
              padding={"8px"}
              justifyContent={"center"}
              align={"center"}
              flexDirection={"column"}
              gap={"8px"}
            >
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                Pandora Pool
              </Text>
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                --
              </Text>
              <Box display={"flex"}>
                <Text
                  color={"white !important"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  {pandoraPoolAmount}
                </Text>
                <AzIcon size={{ base: "16px" }} padding={{ base: "5px" }} />
              </Box>
            </Flex>
            <Box
              w="100%"
              h="100%"
              className="pandora-modal-ticket-overlay"
              zIndex="0"
            ></Box>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"18px"}
            flexWrap={"wrap"}
            alignItems={"center"}
            borderRadius={"12px"}
            border={"2px solid #00D5C4"}
            minW={"300px"}
            position={"relative"}
            overflow={"hidden"}
            padding={"8px"}
          >
            <Flex
              w="100%"
              h="100%"
              zIndex="1"
              padding={"8px"}
              justifyContent={"center"}
              align={"center"}
              flexDirection={"column"}
              gap={"8px"}
            >
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                Participants
              </Text>
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                --
              </Text>
              <Box display={"flex"}>
                <Text
                  color={"white !important"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  {totalPlayers}
                </Text>
                <PlayersIcon
                  size={{ base: "18px" }}
                  padding={{ base: "7px" }}
                />
              </Box>
            </Flex>
            <Box
              w="100%"
              h="100%"
              className="pandora-modal-ticket-overlay"
              zIndex="0"
            ></Box>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"18px"}
            flexWrap={"wrap"}
            alignItems={"center"}
            borderRadius={"12px"}
            border={"2px solid #00D5C4"}
            minW={"300px"}
            position={"relative"}
            overflow={"hidden"}
            padding={"8px"}
          >
            <Flex
              w="100%"
              h="100%"
              zIndex="1"
              padding={"8px"}
              justifyContent={"center"}
              align={"center"}
              flexDirection={"column"}
              gap={"8px"}
            >
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                Hold Amount
              </Text>
              <Text
                color={"white !important"}
                fontSize={"18px"}
                fontWeight={"600"}
              >
                --
              </Text>
              <Box display={"flex"}>
                <Text
                  color={"white !important"}
                  fontSize={"18px"}
                  fontWeight={"600"}
                >
                  {formatNumDynDecimal(holdAmount ? holdAmount : 0)}
                </Text>
                <AzIcon size={{ base: "16px" }} padding={{ base: "5px" }} />
              </Box>
            </Flex>
            <Box
              w="100%"
              h="100%"
              className="pandora-modal-ticket-overlay"
              zIndex="0"
            ></Box>
          </Flex>
        </Flex>
      </SectionContainer>
      <SectionContainer>
        <PandoraHistoryButton
          onClick={() => setModalPandoraBetHistoryVisible(true)}
        />
        <PandoraBetHistoryModal
          isOpen={modalPandoraBetHistoryVisible}
          onClose={() => setModalPandoraBetHistoryVisible(false)}
        />
      </SectionContainer>
    </>
  );
};

export default PandoraMode;
