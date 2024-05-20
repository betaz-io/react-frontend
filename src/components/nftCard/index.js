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
  useDisclosure,
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
import NFTCardDetailModal from "./nftCardDetailModal";

const PandoraTicketsCard = ({ item }) => {
  const isMobile = useCheckMobileScreen(480);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        className="PandoraTicketCard"
        border={"2px solid #00D5C4"}
        padding={"6px"}
        borderRadius={"6px"}
        background={
          "radial-gradient(83.96% 38.98% at 50% 50.01%, #0D1B14 0%, #FFF 100%)"
        }
        w={"176px"}
        position={"relative"}
        cursor={"pointer"}
        sx={{
          _hover: {
            background:
              "radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)",
          },
        }}
        mx={"auto"}
        onClick={() => onOpen()}
      >
        <Box
          w={"100%"}
          borderRadius={"6px"}
          overflow={"hidden"}
          position={"relative"}
        >
          <Image src={PandoraItemBG} alt="Pandora-item-bg" loading="lazy"/>
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
            Pandora secret box #{item?.nftId}
          </Text>
        </Box>
      </Box>
      <NFTCardDetailModal isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
};

export default PandoraTicketsCard;
