import {
  Box,
  Text,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { formatTableValue, formatTableValueMobile } from "./formatTableHistory";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbMoodSmileFilled } from "react-icons/tb";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRewardStaking,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentPage,
} from "store/slices/rewardStakingSlide";
import StakeStakingPool from "components/stakingPool/StakeStakingPool";
import UnstakeStakingPool from "components/stakingPool/UnstakeStakingPool";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";

const ClaimRewardStakingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const { rewardData, currentPage, totalPages } = useSelector(
    (s) => s.rewardStaking
  );

  useEffect(() => {
    dispatch(fetchRewardStaking(currentAccount));
  }, [currentAccount, isOpen]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) dispatch(incrementCurrentPage());
    else toast("Only " + totalPages + " pages can be displayed");
    dispatch(fetchRewardStaking(currentAccount));
  });

  const previousPage = useCallback(() => {
    if (currentPage > 1) dispatch(decrementCurrentPage());
    dispatch(fetchRewardStaking(currentAccount));
  });

  const goToPage = useCallback((page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchRewardStaking(currentAccount));
  });

  const tableData = {
    headers: [
      {
        label: "Staker",
        key: "staker",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Time",
        key: "time",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Reward Amount",
        key: "reward_amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
    ],
    data: rewardData,
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
          mt={{ base: "24px", sm: "unset" }}
        >
          Reward history
        </ModalHeader>
        <ModalCloseButton color="#FFF" />
        <ModalBody>
          {isMobile ? (
            <Flex direction="column" maxH="600px" overflowY="auto" mt="12px">
              {rewardData?.length === 0 ? (
                <Box
                  sx={{
                    borderRadius: "12px",
                    marginTop: "12px",
                    background: "#122126",
                    p: "12px 24px 24px 24px",
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <Text textAlign="center">Reward not found!</Text>
                </Box>
              ) : (
                tableData?.data?.map((e, rowIndex) => {
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
                                {tableData?.headers[index].label}
                              </Text>
                            </Flex>
                            <Flex
                              direction="column"
                              justifyContent="end"
                              alignItems="end"
                            >
                              <Text mt="12px">
                                {formatTableValue(e[keyvalue], keyvalue)}
                              </Text>
                            </Flex>
                          </SimpleGrid>
                        );
                      })}
                    </Box>
                  );
                })
              )}
            </Flex>
          ) : (
            <TableContainer mt="24px" overflowY="hidden">
              <Table
                sx={{
                  overflowX: "auto",
                  minWidth: "500px",
                }}
                variant="unstyled"
                className="history-table"
              >
                <Thead>
                  <Tr className="history-table-header-container">
                    {tableData?.headers.map((e, index) => {
                      const isFirstChild = index === 0;
                      const isLastChild =
                        index === tableData?.headers.length - 1;
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
                  {rewardData?.length === 0 ? (
                    <Tr>
                      <Td colSpan={4}>
                        <Box
                          sx={{
                            marginTop: "24px",
                            background: "#0d171b",
                            py: "16px",
                            borderRadius: "8px",
                          }}
                        >
                          <Text textAlign="center">Reward not found!</Text>
                        </Box>
                      </Td>
                    </Tr>
                  ) : (
                    tableData?.data?.map((e, rowIndex) => {
                      const keyValues = Object.keys(e);
                      return (
                        <Tr>
                          {keyValues.map((keyvalue, index) => {
                            const isFirstChild = index === 0;
                            const isLastChild =
                              index === tableData?.headers.length - 1;
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
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          {/* Modal unstake & stake */}
          <StakeStakingPool />
          <UnstakeStakingPool />
          {/* End modal unstake & stake */}
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
            {Array.from({ length: totalPages }).map((_, index) => (
              <IconButton
                variant="outline"
                color="#FFFF"
                disabled="disabled"
                borderColor="#1BECA6"
                onClick={() => goToPage(index + 1)}
              >
                <span
                  style={{
                    color: "#1BECA6",
                  }}
                >
                  {index + 1}
                </span>
              </IconButton>
            ))}
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

export default ClaimRewardStakingModal;
