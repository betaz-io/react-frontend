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

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraMode = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [winAmountPlayer, setWinAmountPlayer] = useState(0);

  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { sessionId } = useSelector((s) => s.pandoraNft);

  const getTotalPlayers = async (sessionId) => {
    const total = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::totalPlayersInSession",
      sessionId
    );

    setTotalPlayers(total?.toHuman().Ok);
  };

  const getWinAmountByPlayers = async (sessionId) => {
    const totalId = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getLastSessionId"
    );

    let total = Number(totalId?.toHuman().Ok);
    let amount = 0;
    for (let i = 1; i < total; i++) {
      let temp = await execContractQuery(
        defaultCaller,
        pandora_pool_contract.CONTRACT_ABI,
        pandora_pool_contract.CONTRACT_ADDRESS,
        0,
        "pandoraPoolTraits::getPlayerWinAmount",
        i,
        currentAccount?.address
      );
      temp = temp?.toHuman().Ok?.replaceAll(",", "");
      if (temp) amount = +temp;
    }
    setWinAmountPlayer(amount);
  };

  useEffect(() => {
    if (sessionId) getTotalPlayers(sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (api && currentAccount) getWinAmountByPlayers();
  }, [currentAccount, api]);

  const {
    modalPandoraWithdrawVisible,
    setModalPandoraWithdrawVisible,
    modalPandoraBetHistoryVisible,
    setModalPandoraBetHistoryVisible,
    modalPandoraSelectTicketVisible,
    setModalPandoraSelectTicketVisible,
    modalPandoraYourBetHistoryVisible,
    setModalPandoraYourBetHistoryVisible,
  } = useModal();
  return (
    <>
      <SectionContainer>
        <Box w="100%" h="auto" mt="48px" position="relative">
          <SimpleGrid columns={{ md: 1, lg: 2 }}>
            <PandoraNumber />
            <Box className="section-pandora-right" position="relative">
              <PandoraTicket />
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
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </SectionContainer>
      <SectionContainer
        sx={{
          marginTop: "48px",
        }}
      >
        <Flex justifyContent={"center"} gap={"24px"} flexWrap={"wrap"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"18px"}
            flexWrap={"wrap"}
            alignItems={"center"}
            borderRadius={"8px"}
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
                Pandora pool
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
                  {poolBalance?.pandora}
                </Text>
                <AppIcon size={{ base: "18px" }} padding={{ base: "4px" }} />
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
            borderRadius={"8px"}
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
            borderRadius={"8px"}
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
                Win Amount
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
                  {formatNumDynDecimal(
                    winAmountPlayer ? winAmountPlayer / 10 ** 12 : 0
                  )}
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