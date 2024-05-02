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
import { useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { clientAPITotalPages } from "api/client";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useQuery } from "react-query";
import useWebSocket from "react-use-websocket";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const tabData = [
  {
    label: "My bets",
  },
  {
    label: "All bets",
  },
  {
    label: "Rare win",
  },
];

let currentPage = 1;

const wssUrl = process.env.REACT_APP_WSS_API || "ws://localhost:3010";

const BetHistoryModal = ({ isOpen, onClose }) => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const [currentTab, setCurrentTab] = useState(1);
  const [uiPage, setUIPage] = useState(1);
  const [data, setdata] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const {} = useWebSocket(wssUrl, {
    onOpen: () => console.log(`connected websocket ${wssUrl}`),
    onMessage: (event) => {
      const message = JSON.parse(event?.data);
      console.log({ message });
      if (
        message?.event == "added WinEvent" ||
        message?.event == "added LoseEvent"
      ) {
        console.log("start refetch");
        getData();
      }
    },
    onClose: () => console.log(`disconnected websocket ${wssUrl}`),
    onError: (error) => {
      console.log(`Error from websocket ${wssUrl}`);
      console.log(error);
    },
    shouldReconnect: (closeEvent) => true,
  });

  const getData = async () => {
    if (currentTab === 0) {
      if (currentAccount === "") {
        setdata([]);
        return;
      }
      let [newData, total] = await Promise.all([
        clientAPI("post", "/getEventsByPlayer", {
          player: currentAccount?.address,
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
        clientAPITotalPages("post", "/getEventsByPlayer", {
          player: currentAccount?.address,
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
      ]);
      // console.log({mybets: data});
      if (newData !== data);
      {
        setdata(newData);
        setTotalPages(Math.ceil(total / 10));
      }
    } else if (currentTab === 1) {
      let [newData, total] = await Promise.all([
        clientAPI("post", "/getEvents", {
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
        clientAPITotalPages("post", "/getEvents", {
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
      ]);
      // console.log({ all: data });
      if (newData !== data);
      {
        setdata(newData);
        setTotalPages(Math.ceil(total / 10));
      }
    } else if (currentTab === 2) {
      let [newData, total] = await Promise.all([
        clientAPI("post", "/getRareWins", {
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
        clientAPITotalPages("post", "/getRareWins", {
          limit: 10,
          offset: 10 * (currentPage - 1),
        }),
      ]);
      // console.log({rarewins: data});
      if (newData !== data);
      {
        setdata(newData);
        setTotalPages(Math.ceil(total / 10));
      }
    }
  };

  const dataQuery = useQuery(
    "query-player-event",
    async () => {
      await new Promise(async (resolve) => {
        await getData();
        resolve();
      });
    },
    { refetchOnWindowFocus: false }
  );

  // useInterval(() => getData(), 4000);

  useEffect(() => {
    currentPage = 1;
    setUIPage(currentPage);
    dataQuery.refetch();
  }, [currentTab]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) currentPage++;
    else toast(`Only ${totalPages} pages can be displayed`);
    setUIPage(currentPage);
    getData();
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) currentPage--;
    setUIPage(currentPage);
    getData();
  });

  const goToPage = useCallback((page) => {
    currentPage = page;
    setUIPage(page);
    getData();
  });

  // console.log({ totalPages, currentPage });
  const historyTableData = {
    headers: [
      {
        label: "Player",
        key: "player",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Block number",
        key: "block-number",
        icon: <BiLayer size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Bet amount",
        key: "bet-amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Type",
        key: "type",
        icon: (
          <MdSwapVerticalCircle size="24px" style={{ marginRight: "8px" }} />
        ),
      },
      {
        label: "Prediction",
        key: "prediction",
        icon: (
          <RiCopperDiamondFill size="24px" style={{ marginRight: "8px" }} />
        ),
      },
      {
        label: "Result",
        key: "result",
        icon: <AiFillStar size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Reward in $AZERO",
        key: "won-amount",
        icon: <RiVipDiamondFill size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Reward in $BetAZ",
        key: "reward-amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Oracle round",
        key: "round",
        icon: (
          <RiArrowTurnBackFill size="24px" style={{ marginRight: "8px" }} />
        ),
      },
    ],
    data: data,
  };

  // const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    currentPage = selectedPage.selected + 1;
    dataQuery.refetch();
  };

  const isMobile = useCheckMobileScreen(480);
  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        className="history-modal-content-container"
        maxW={{
          base: "calc(100vw) !important",
          sm: "calc(100vw - 120px) !important",
        }}
      >
        <ModalHeader
          className="history-modal-content-title linear-text"
          fontWeight={{ base: "500", sm: "700" }}
          fontSize={{ base: "20px", sm: "32px" }}
        >
          Bet History
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          <Box className="history-modal-tabs">
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
          {dataQuery.isLoading || dataQuery.isFetching ? (
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
                        border: "2px solid rgba(255, 255, 255, 0.4)",
                      }}
                    >
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
                  <Tr className="history-table-header-container">
                    {historyTableData.headers.map((e, index) => {
                      const isFirstChild = index === 0;
                      const isLastChild =
                        index === historyTableData.headers.length - 1;
                      return (
                        <Th className="history-table-header-column">
                          <Box
                            sx={{
                              borderY: "1px solid #1beca6",
                              borderLeft: isFirstChild && "1px solid #1beca6",
                              borderRight: isLastChild && "1px solid #1beca6",
                              borderLeftRadius: isFirstChild && "8px",
                              borderRightRadius: isLastChild && "8px",
                              paddingLeft: isFirstChild && "20px",
                              width: "full",
                              py: "20px",
                            }}
                            display="flex"
                            justifyContent={index > 0 && "center"}
                            alignItems="center"
                          >
                            {e?.icon}
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
                                  sx={{
                                    marginTop: rowIndex === 0 ? "24px" : "8px",
                                    background: "#0d171b",
                                    py: "16px",
                                    pl: isFirstChild && "24px",
                                    borderY:
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderLeft:
                                      isFirstChild &&
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderRight:
                                      isLastChild &&
                                      "1px solid rgba(255, 255, 255, 0.4)",
                                    borderLeftRadius: isFirstChild && "8px",
                                    borderRightRadius: isLastChild && "8px",
                                  }}
                                >
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
                            background: "#0d171b",
                            py: "16px",
                            pl: "24px",
                            borderY: "1px solid rgba(255, 255, 255, 0.4)",
                            borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                            borderRight: "1px solid rgba(255, 255, 255, 0.4)",
                            borderLeftRadius: "8px",
                            borderRightRadius: "8px",
                            width: "100%",
                            color: "white",
                            textAlign: "center",
                            fontSize: "18px",
                          }}
                        >
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
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BetHistoryModal;
