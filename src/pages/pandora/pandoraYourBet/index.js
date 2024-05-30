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
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { BiLayer } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { TbMoodSmileFilled } from "react-icons/tb";
import { MdSwapVerticalCircle } from "react-icons/md";
import {
  RiCopperDiamondFill,
  RiVipDiamondFill,
  RiArrowTurnBackFill,
} from "react-icons/ri";
import "./styles.css";
import { AiFillStar } from "react-icons/ai";
import { formatTableValue, formatTableValueMobile } from "./formatTable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { clientAPITotalPages } from "api/client";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useQuery } from "react-query";
import useWebSocket from "react-use-websocket";
import EffectIcon from "assets/img/LightIcon1.png";
import PandoraBGCoin from "assets/img/PandoraBGCoin.png";
import BGModalBetHistory from "assets/img/BGModalBetHistory.png";
import { usePandoraYourBetHistory } from "hooks/usePandoraYourBetHistory";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
// let currentPage = 1;

const wssUrl = process.env.REACT_APP_WSS_API || "ws://localhost:3010";

const PandoraYourBetHistoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);

  const {
    pandoraYourBetHistoryData,
    totalPages,
    isLoading: isLoadingPandoraHistoryData,
    refetch: refetchPandoraHistoryData,
    isRefetching: isRefetchingPandoraHistoryData,
    prevPage: handlePrev,
    nextPage: handleNext,
    setCurrentPage,
    currentPage,
  } = usePandoraYourBetHistory(currentAccount);
  const [rowActive, setRowActive] = useState(0);

  const historyTableData = {
    headers: [
      {
        label: "Section id",
        key: "player",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Ticket id",
        key: "ticket-id",
        icon: <RiVipDiamondFill size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Bet number",
        key: "bet-number",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Time stamp",
        key: "time-stamp",
        icon: (
          <MdSwapVerticalCircle size="24px" style={{ marginRight: "8px" }} />
        ),
      },
    ],
    data: pandoraYourBetHistoryData,
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    refetchPandoraHistoryData();
  };

  const isMobile = useCheckMobileScreen(480);
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
        {/* <Box
          className="lucky-number-circle-image"
          bgImage={BGModalBetHistory}
          bgRepeat="no-repeat"
          bgPosition="center"
          position="absolute"
          top={"-20px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          // zIndex={-2}
        ></Box> */}
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
          alt="images"
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
          alt="images"
        />
        <ModalHeader
          className="history-modal-content-title linear-text"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
        >
          Your Prediction History
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          {isLoadingPandoraHistoryData || isRefetchingPandoraHistoryData ? (
            <Box mt="24px" w="100%" minH="800px">
              <CircularProgress
                position="absolute"
                top="50%"
                left="50%"
                transform="translateX(-50%)"
                isIndeterminate
                color="#1beca6"
              />
            </Box>
          ) : isMobile ? (
            <Flex direction="column" maxH="600px" overflowY="auto" mt="12px">
              {historyTableData.data.length > 0 ? (
                historyTableData.data.map((e, rowIndex) => {
                  const keyValues = Object.keys(e);
                  return (
                    <Box
                      sx={{
                        borderRadius: "12px",
                        marginTop: "12px",
                        background: "#122126",
                        p: "12px 24px 24px 24px",
                        border: "2px solid #1BECA6",
                        backgroundColor: "transparent",
                        position: "relative"
                      }}
                    >
                      <Box
                        w="100%"
                        h="100%"
                        className="pandora-modal-ticket-overlay"
                        zIndex="-1"
                      ></Box>
                      {keyValues.map((keyvalue, index) => {
                        return (
                          <SimpleGrid columns={2}>
                            <Flex
                              direction="column"
                              justifyContent="start"
                              alignItems="start"
                              color="#F7F7F8"
                            >
                              <Text mt="12px">
                                {historyTableData.headers[index].label}
                              </Text>
                            </Flex>
                            <Flex
                              direction="column"
                              justifyContent="end"
                              alignItems="end"
                            >
                              <Text mt="12px">
                                {formatTableValueMobile(e[keyvalue], keyvalue)}
                              </Text>
                            </Flex>
                          </SimpleGrid>
                        );
                      })}
                    </Box>
                  );
                })
              ) : (
                <Box
                  sx={{
                    borderRadius: "12px",
                    marginTop: "12px",
                    background: "#122126",
                    p: "12px 24px 24px 24px",
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <SimpleGrid columns={1}>
                    <Flex
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      color="#F7F7F8"
                    >
                      <Text mt="12px">No records found</Text>
                    </Flex>
                  </SimpleGrid>
                </Box>
              )}
            </Flex>
          ) : (
            <TableContainer mt="24px" overflowY="hidden">
              <Table
                sx={{
                  overflowX: "auto",
                  minWidth: "1320px",
                }}
                variant="unstyled"
                className="history-table"
              >
                <Thead>
                  <Tr className="pandora-history-table-header-container">
                    {historyTableData.headers.map((e, index) => {
                      const isFirstChild = index === 0;
                      const isLastChild =
                        index === historyTableData.headers.length - 1;
                      return (
                        <Th className="history-table-header-column">
                          <Box
                            sx={{
                              border: "2px solid #505B60",
                              borderRadius: "12px",
                              padding: "20px",
                              // width: "full",
                              py: "20px",
                              color: "#FFA000",
                              marginLeft: !isFirstChild && "12px",
                            }}
                            display="flex"
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            {/* {e?.icon} */}
                            {e.label}
                          </Box>
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {historyTableData.data.length > 0 ? (
                    historyTableData.data.map((e, rowIndex) => {
                      const keyValues = Object.keys(e);

                      return (
                        <Tr>
                          {keyValues.map((keyvalue, index) => {
                            const isFirstChild = index === 0;
                            const isLastChild =
                              index === historyTableData.headers.length - 1;
                            return (
                              <Td>
                                <Box
                                  onClick={() => {
                                    if (rowIndex !== rowActive)
                                      setRowActive(rowIndex);
                                    else {
                                      setRowActive(0);
                                    }
                                  }}
                                  cursor={"pointer"}
                                  sx={{
                                    marginTop: rowIndex === 0 ? "24px" : "8px",
                                    // background: "#063466",
                                    py: "16px",
                                    pl: isFirstChild && "24px",
                                    // borderY:
                                    //   "1px solid rgba(255, 255, 255, 0.4)",
                                    // borderLeft:
                                    //   isFirstChild &&
                                    //   "1px solid rgba(255, 255, 255, 0.4)",
                                    // borderRight:
                                    //   isLastChild &&
                                    //   "1px solid rgba(255, 255, 255, 0.4)",
                                    borderLeftRadius: isFirstChild && "8px",
                                    borderRightRadius: isLastChild && "8px",
                                    position: "relative",
                                    paddingLeft: !isFirstChild && "12px",
                                  }}
                                >
                                  <Box
                                    w="100%"
                                    h="100%"
                                    className="pandora-modal-ticket-overlay"
                                    zIndex="-1"
                                    borderRadius="none"
                                    borderLeftRadius={isFirstChild && "8px"}
                                    borderRightRadius={isLastChild && "8px"}
                                    backgroundColor={
                                      rowActive === rowIndex &&
                                      "#06223F !important"
                                    }
                                  ></Box>
                                  {formatTableValue(e[keyvalue], keyvalue)}
                                </Box>
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td colSpan={9}>
                        <Box
                          sx={{
                            marginTop: "24px",
                            // background: "#0d171b",
                            py: "16px",
                            pl: "24px",
                            // borderY: "1px solid rgba(255, 255, 255, 0.4)",
                            // borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                            // borderRight: "1px solid rgba(255, 255, 255, 0.4)",
                            borderLeftRadius: "8px",
                            borderRightRadius: "8px",
                            width: "100%",
                            color: "white",
                            textAlign: "center",
                            fontSize: "18px",
                            position: "relative",
                          }}
                        >
                          <Box
                            w="100%"
                            h="100%"
                            className="pandora-modal-ticket-overlay"
                            zIndex="-1"
                            borderRadius="none"
                            borderLeftRadius={"8px"}
                            borderRightRadius={"8px"}
                          ></Box>
                          No records found
                        </Box>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </ModalBody>
        <ModalFooter className="history-table-footer-container">
          <Box display="flex" gap="8px">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              breakClassName={"ellipsis"}
              breakLabel={"..."}
              previousLabel={<MdOutlineArrowBackIosNew />}
              nextLabel={<MdOutlineArrowForwardIos />}
              renderOnZeroPageCount={null}
              initialPage={currentPage - 1}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PandoraYourBetHistoryModal;
