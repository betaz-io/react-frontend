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
import PandoraCloseButton from "assets/img/PandoraCloseButton.svg";
import PandoraListCoin from "assets/img/PandoraListCoin.png";

const NFTCardDetailModal = ({ item, onClose, isOpen }) => {
  const isMobile = useCheckMobileScreen(480);
  const [currentTab, setCurrentTab] = useState(0);

  const tabData = [
    {
      label: "DETAIL",
      content: <NFTCardDetail item={item} />,
    },
    {
      label: "OWNER HISTORY",
      content: "comming soon",
    },
    {
      label: "TX HISTORY",
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
        border={"none"}
        borderRadius={"12px"}
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
        <Box
          className="lucky-number-circle-image"
          bgImage={PandoraListCoin}
          bgRepeat="no-repeat"
          bgPosition="center"
          maxW={{ base: "280px", sm: "760px" }}
          w={{ base: "280px", sm: "760px" }}
          position="absolute"
          backdropBlur={"10px"}
          right={"-40px"}
          top={"210px"}
          zIndex={2}
        ></Box>
        {/* <Image
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
        /> */}
        <ModalHeader
          className="history-modal-content-title"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
          background={"linear-gradient(90deg, #1BECA6 0%, #1BBEF5 100%)"}
          borderTopRadius={"12px"}
        >
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
                  onClick={() => setCurrentTab(index)}
                  minW={{ base: "240px" }}
                  cursor={"pointer"}
                >
                  <Text
                    fontSize={{ base: "16px", sm: "20px" }}
                    fontWeight={{ base: "500", sm: isActive && "700" }}
                    className={` ${isActive && ""}`}
                    textShadow={isActive && "3px 3px 6px #000000"}
                  >
                    {e?.label}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </ModalHeader>
        <ModalBody paddingTop={"0px"} paddingX={"12px"} paddingBottom={"12px"}>
          <Box
            className="pandora-btn-close"
            position="absolute"
            top="0px"
            right="0px"
            zIndex={3}
            onClick={onClose}
          >
            <Image
              src={PandoraCloseButton}
              alt="Pandora-close-btn"
              verticalAlign="middle"
              maxW="100%"
              loading="lazy"
            />
          </Box>
          <Box
            padding={"24px"}
            color={"white"}
            borderLeft={"1px solid #1BECA6"}
            borderRight={"1px solid #1BECA6"}
            borderBottom={"1px solid #1BECA6"}
            borderBottomLeftRadius={"12px"}
            borderBottomRightRadius={"12px"}
          >
            {tabData[currentTab].content}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NFTCardDetailModal;
