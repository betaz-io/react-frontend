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
  GridItem,
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
import { AddressCopier } from "components/addressCopier";
import { convertToFixedLengthNumberString } from "utils";

const NFTCardDetail = ({ item }) => {
  const isMobile = useCheckMobileScreen(480);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
  };
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={"24px"}>
        <GridItem colSpan={4}>
          <Box
            className="PandoraTicketCard"
            border={"2px solid #00D5C4"}
            padding={"12px"}
            borderRadius={"6px"}
            background="radial-gradient(83.96% 38.98% at 50% 60.01%, #FFF 0%, #FFA000 100%)"
            w={"100%"}
            position={"relative"}
            cursor={"pointer"}
          >
            <Image
              src={EffectIcon}
              alt=""
              position="absolute"
              top="300px"
              right="-100px"
              w="200px"
              transform={"rotate(-90deg)"}
              zIndex={4}
              loading="lazy"
            />
            <Image
              src={EffectIcon}
              alt=""
              position="absolute"
              top="-30px"
              left="-60px"
              w="200px"
              zIndex={4}
              loading="lazy"
            />
            <Box
              w={"100%"}
              borderRadius={"6px"}
              overflow={"hidden"}
              position={"relative"}
            >
              <Image src={PandoraItemBG} alt="pandora-item-bg" loading="lazy" />
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
                fontWeight={"500"}
                color={"black"}
                fontSize={"3xl"}
                mt={"24px"}
              >
                Pandora secret box #{item?.nftId}
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={8}>
          <Box w={"100%"}>
            <Box
              color={"white"}
              fontSize={"28px"}
              fontWeight={"500"}
              textStyle={""}
              gap={"8px"}
              //   textTransform={"uppercase"}
            >
              <Text>
                Owned by{" "}
                <span
                  style={{
                    color: "#1BE5B2",
                    textDecoration: "underline",
                  }}
                >
                  {item?.owner}
                </span>
              </Text>
            </Box>
            <Flex
              justifyContent={"start"}
              flexWrap={"wrap"}
              mt={"12px"}
              gap={"24px"}
              w={"100%"}
            >
              <Box
                minW={"240px"}
                padding={"12px"}
                borderRadius={"12px"}
                position={"relative"}
                background={"transparent"}
              >
                <Box
                  w="100%"
                  h="100%"
                  className="pandora-modal-overlay"
                  background={"#000"}
                  opacity={0.6}
                ></Box>
                <Text fontSize={"16px"} fontWeight={500} color={"#A8A8A8"}>
                  State
                </Text>
                <Text
                  fontSize={"20px"}
                  fontWeight={500}
                  mt={"12px"}
                  color={"#1BE5B2"}
                  textDecoration={"underline"}
                >
                  {item?.isUsed == true ? "Used" : "Unused"}
                </Text>
              </Box>

              {item?.sessionId && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  borderRadius={"12px"}
                  position={"relative"}
                  background={"transparent"}
                >
                  <Box
                    w="100%"
                    h="100%"
                    className="pandora-modal-overlay"
                    background={"#000"}
                    opacity={0.6}
                  ></Box>
                  <Text fontSize={"16px"} fontWeight={500} color={"#A8A8A8"}>
                    Bet Session
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#1BE5B2"}
                    textDecoration={"underline"}
                  >
                    {item?.sessionId}
                  </Text>
                </Box>
              )}

              {item?.betNumber && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  borderRadius={"12px"}
                  position={"relative"}
                  background={"transparent"}
                >
                  <Box
                    w="100%"
                    h="100%"
                    className="pandora-modal-overlay"
                    background={"#000"}
                    opacity={0.6}
                  ></Box>
                  <Text fontSize={"16px"} fontWeight={500} color={"#A8A8A8"}>
                    Bet Number
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#1BE5B2"}
                    textDecoration={"underline"}
                  >
                    {convertToFixedLengthNumberString(item?.betNumber, 6)}
                  </Text>
                </Box>
              )}

              {item?.time && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  borderRadius={"12px"}
                  position={"relative"}
                  background={"transparent"}
                >
                  <Box
                    w="100%"
                    h="100%"
                    className="pandora-modal-overlay"
                    background={"#000"}
                    opacity={0.6}
                  ></Box>
                  <Text fontSize={"16px"} fontWeight={500} color={"#A8A8A8"}>
                    Date
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#1BE5B2"}
                    textDecoration={"underline"}
                  >
                    {formatTimestamp(item?.time)}
                  </Text>
                </Box>
              )}
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default NFTCardDetail;
