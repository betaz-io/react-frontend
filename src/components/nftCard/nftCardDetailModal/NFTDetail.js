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

const NFTCardDetail = ({ item }) => {
  const isMobile = useCheckMobileScreen(480);
  console.log({ item });
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={"24px"}>
        <GridItem colSpan={5}>
          <Box
            w={"100%"}
            borderRadius={"12px"}
            overflow={"hidden"}
            position={"relative"}
            border={"1px solid #1BE8AD"}
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
        </GridItem>
        <GridItem colSpan={7}>
          <Box w={"100%"}>
            <Box
              color={"white"}
              fontSize={"28px"}
              fontWeight={"600"}
              textStyle={""}
              display={"flex"}
              gap={"8px"}
              fontStyle={"italic"}
              //   textTransform={"uppercase"}
            >
              Owned by{" "}
              <AddressCopier
                address={item?.owner}
                number={10}
                justifyContent="center"
              />
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
                background={"#00d5c4"}
                borderRadius={"12px"}
              >
                <Text fontSize={"18px"} fontWeight={500}>
                  State
                </Text>
                <Text
                  fontSize={"20px"}
                  fontStyle={"italic"}
                  fontWeight={500}
                  mt={"12px"}
                  color={"#FFA000"}
                >
                  {item?.isUsed == true ? "Used" : "Unused"}
                </Text>
              </Box>

              {item?.sessionId && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  background={"#00d5c4"}
                  borderRadius={"12px"}
                >
                  <Text fontSize={"18px"} fontWeight={500}>
                    SessionId
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontStyle={"italic"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#FFA000"}
                  >
                    {item?.sessionId}
                  </Text>
                </Box>
              )}

              {item?.betNumber && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  background={"#00d5c4"}
                  borderRadius={"12px"}
                >
                  <Text fontSize={"18px"} fontWeight={500}>
                    betNumber
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontStyle={"italic"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#FFA000"}
                  >
                    {item?.betNumber}
                  </Text>
                </Box>
              )}

              {item?.time && (
                <Box
                  minW={"240px"}
                  padding={"12px"}
                  background={"#00d5c4"}
                  borderRadius={"12px"}
                >
                  <Text fontSize={"18px"} fontWeight={500}>
                    Time stamp
                  </Text>
                  <Text
                    fontSize={"20px"}
                    fontStyle={"italic"}
                    fontWeight={500}
                    mt={"12px"}
                    color={"#FFA000"}
                  >
                    {item?.time}
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
