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

const BetHistoryModal = ({ isOpen, onClose }) => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const [currentTab, setCurrentTab] = useState(0);
  const [uiPage, setUIPage] = useState(1);
  const [data, setdata] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    if (currentTab === 0) {
      if (currentAccount === "") {
        setdata([]);
        return;
      }
      let [data, total] = await Promise.all([
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
      setdata(data);
      setTotalPages(Math.ceil(total / 10));
    } else if (currentTab === 1) {
      let [data, total] = await Promise.all([
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
      setdata(data);
      setTotalPages(Math.ceil(total / 10));
    } else if (currentTab === 2) {
      let [data, total] = await Promise.all([
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
      setTotalPages(Math.ceil(total / 10));
      setdata(data);
    }
  };
  useInterval(() => getData(), 5000);

  useEffect(() => {
    currentPage = 1;
    setUIPage(currentPage);
    getData();
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

  console.log({ totalPages, currentPage });
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
        label: "Reward in $BetAZ",
        key: "won-amount",
        icon: <RiVipDiamondFill size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Reward in $AZERO",
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
          {isMobile ? (
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
            <IconButton
              variant="outline"
              color="#FFFFFF"
              onClick={() => previousPage()}
            >
              <IoIosArrowBack />
            </IconButton>
            <IconButton
              variant="outline"
              color="#FFFF"
              disabled="disabled"
              borderColor="#1BECA6"
            >
              <span
                style={{
                  color: "#1BECA6",
                }}
              >
                {uiPage}
              </span>
            </IconButton>

            <IconButton
              // ml="8px"
              variant="outline"
              color="#FFFFFF"
              onClick={() => nextPage()}
            >
              <IoIosArrowForward />
            </IconButton>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BetHistoryModal;
