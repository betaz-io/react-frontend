import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  CircularProgress,
  Image,
  Grid,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useQuery } from "react-query";
import useWebSocket from "react-use-websocket";
import EffectIcon from "assets/img/LightIcon1.png";
import PandoraBGCoin from "assets/img/PandoraBGCoin.png";
import { usePandoraTickets } from "hooks/usePandoraTickets";
import PandoraItem from "assets/img/PandoraItem.png";
import PandoraItemBG from "assets/img/PandoraItemBG.png";
import { useTicket } from "contexts/useSelectTicket";
import NFTCardDetail from "./NFTDetail";

const NFTCardDetailModal = ({ item, onClose, isOpen }) => {
  const isMobile = useCheckMobileScreen(480);
  const [currentTab, setCurrentTab] = useState(0);

  const tabData = [
    {
      label: "Detail",
      content: <NFTCardDetail item={item}/>,
    },
    {
      label: "Owner history",
      content: "comming soon",
    },
    {
      label: "Tx history",
      content: "comming soon",
    },
  ];
  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        className="pandora-history-modal-content-container"
        maxW={{
          base: "calc(100vw) !important",
          sm: "calc(100vw - 120px) !important",
        }}
        position="relative"
      >
        <Box w="100%" h="100%" className="pandora-modal-overlay"></Box>
        <Box
          className="lucky-number-circle-image"
          bgImage={PandoraBGCoin}
          bgRepeat="no-repeat"
          bgPosition="center"
          w={{ base: "280px", sm: "480px" }}
          position="absolute"
          backdropBlur={"10px"}
          right={"10%"}
          top={"50%"}
          transform={"translateY(-50%)"}
          zIndex={-2}
          opacity={0.3}
        ></Box>
        <Image
          position="absolute"
          w="240px"
          sx={{
            bottom: "200px",
            left: "-121px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
          transform={"rotate(-90deg)"}
          loading="lazy"
        />
        <Image
          position="absolute"
          w="240px"
          sx={{
            top: "-36px",
            right: "0px",
          }}
          src={EffectIcon}
          className="pandora-effect-icon"
          loading="lazy"
        />
        <ModalHeader
          className="history-modal-content-title linear-text"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
        >
          My NFT
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Box
            // className="history-modal-tabs"
            display={"flex"}
            gap={"16px"}
          >
            {tabData.map((e, index) => {
              const isActive = currentTab === index;
              return (
                <Box
                  key={`tab-${index}`}
                  className={`history-modal-tab ${
                    isActive && "history-modal-tab-active"
                  }`}
                  onClick={() => setCurrentTab(index)}
                >
                  <Text
                    fontSize={{ base: "16px", sm: "20px" }}
                    fontWeight={{ base: "500", sm: "700" }}
                    className={`history-modal-label ${
                      isActive && "history-modal-label-active"
                    }`}
                  >
                    {e?.label}
                  </Text>
                </Box>
              );
            })}
          </Box>

          <Box mt={"24px"} color={"white"}>
            {tabData[currentTab].content}
          </Box>
        </ModalBody>
        <ModalFooter className="history-table-footer-container"></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTCardDetailModal;
