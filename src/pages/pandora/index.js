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

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraMode = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();

  const { currentAccount } = useSelector((s) => s.substrate);

  const {
    modalPandoraWithdrawVisible,
    setModalPandoraWithdrawVisible,
    modalPandoraBetHistoryVisible,
    setModalPandoraBetHistoryVisible,
    modalPandoraSelectTicketVisible,
    setModalPandoraSelectTicketVisible,
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
