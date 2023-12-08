import {
  Box,
  Text,
  IconButton,
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
import { BiTime } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { formatTableValue, formatTableValueMobile } from "./formatTable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbMoodSmileFilled } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingUnstake,
//   incrementCurrentPage,
//   decrementCurrentPage,
//   setCurrentTab,
// } from "store/slices/stakingSlide";
import { useModal } from "contexts/useModal";
import { memo } from "react";
import CommonButton from "components/button/commonButton";
import { execContractQuery, execContractTx } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import staking_pool_calls from "utils/contracts/staking_pool_calls";
import {
  formatTokenBalance,
  formatChainStringToNumber,
  convertTimeStampToNumber,
  convertToBalance,
  delay,
} from "utils";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { SectionContainer } from "components/container";
import AddWhitelistModal from "./addWhitelistModal/AddWhitelistModal";
import {
  fetchWhitelist,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentTab,
} from "store/slices/whitelistSlide";
import UpdateWhitelistModal from "./updateWhitelistModal/UpdateWhitelistModal";

const tabData = [
  {
    label: "Sale",
  },
  {
    label: "PrivateInvestment",
  },
  {
    label: "AirdropAndMarketing",
  },
  {
    label: "Team",
  },
  {
    label: "Development",
  },
];

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const WhitelistManager = () => {
  const dispatch = useDispatch();
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);

  const { whitelistData, currentPage, currentTab, buyerData } = useSelector(
    (s) => s.whitelist
  );

  const [isLoading, setIsLoading] = useState(false);
  const [modalAddwhitelistVisible, setModalAddwhitelistVisible] =
    useState(false);

  useEffect(() => {
    dispatch(fetchWhitelist(tabData[currentTab].label));
  }, [currentTab]);

  const nextPage = useCallback(() => {
    if (currentPage < 5) dispatch(incrementCurrentPage());
    else toast("Only 5 pages can be displayed");

    dispatch(fetchWhitelist(tabData[currentTab].label));
  });
  const previousPage = useCallback(() => {
    if (currentPage > 1) dispatch(decrementCurrentPage());
    dispatch(fetchWhitelist(tabData[currentTab].label));
  });

  const tableData = {
    headers: [
      {
        label: "Buyer",
        key: "buyer",
        icon: <TbMoodSmileFilled size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Amount",
        key: "amount",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Price",
        key: "price",
        icon: <GiTwoCoins size="24px" style={{ marginRight: "8px" }} />,
      },
      {
        label: "Action",
        key: "action",
        icon: <MdPendingActions size="24px" style={{ marginRight: "8px" }} />,
      },
    ],
    data: whitelistData,
  };

  const claimReward = async () => {
    if (formatChainStringToNumber(currentAccount?.balance?.stake) == 0) {
      toast.error("Not staked");
      return;
    }
    if (
      formatChainStringToNumber(currentAccount?.balance?.stake) >
      formatChainStringToNumber(poolBalance?.staking)
    ) {
      toast.error("Not enough Balance!");
      return;
    }
    setIsLoading(true);

    try {
      // check reward locked
      const toastCheckLock = toast.loading("Step 1: Check reward locked ...");
      const checkLock = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );
      toast.dismiss(toastCheckLock);
      if (!checkLock?.toHuman().Ok) {
        toast.error("Reward not locked!");
        setIsLoading(false);
        return;
      }

      const toastCheckIsClaimed = toast.loading("Step 2: Check is claimed ...");
      const checkLockIsClaimed = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::isClaimed",
        currentAccount?.address
      );
      toast.dismiss(toastCheckIsClaimed);
      if (checkLockIsClaimed?.toHuman().Ok) {
        toast.error("You have claimed!");
        setIsLoading(false);
        return;
      }

      const toastCheckReward = toast.loading(
        "Step 3: Check reward distribution ..."
      );
      const checkReward = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getRewardStarted"
      );
      toast.dismiss(toastCheckReward);

      if (!checkReward?.toHuman().Ok) {
        toast.error("Reward not started!");
        return;
      }

      const toastClaim = toast.loading("Step 4: Claim reward ...");
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "claimReward"
      );
      if (result) {
        toast.dismiss(toastClaim);
        toast.success(`Staking success`);
      } else toast.dismiss(toastClaim);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const isMobile = useCheckMobileScreen(480);
  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Whitelist Manager</Text>
      <Box padding={{ base: "12px 0", sm: "24px 0" }}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "space-between", sm: "end" }}
          gap={{ base: "4px", sm: "12px" }}
        >
          <Button
            className="landing-page-banner-button"
            sx={{
              mb: "8px",
            }}
            onClick={() => {
              setModalAddwhitelistVisible(true);
            }}
          >
            Add whitelist
          </Button>
        </Flex>
      </Box>
      <Box className="history-modal-tabs">
        {tabData?.map((e, index) => {
          const isActive = currentTab === index;
          return (
            <Box
              key={`tab-${index}`}
              className={`history-modal-tab ${
                isActive && "history-modal-tab-active"
              }`}
              onClick={() => dispatch(setCurrentTab(index))}
            >
              <Text
                fontSize={{ base: "16px", sm: "16px" }}
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
          {whitelistData?.length === 0 ? (
            <Box
              sx={{
                borderRadius: "12px",
                marginTop: "12px",
                background: "#122126",
                p: "12px 24px 24px 24px",
                border: "2px solid rgba(255, 255, 255, 0.4)",
              }}
            >
              <Text>
                {currentTab === 0
                  ? tabData[0].label
                  : currentTab === 1
                  ? tabData[1].label
                  : currentTab === 2
                  ? tabData[2].label
                  : currentTab === 3
                  ? tabData[3].label
                  : tabData[4].label}{" "}
                not found!
              </Text>
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
                  const isLastChild = index === tableData?.headers.length - 1;
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
              {whitelistData?.length === 0 ? (
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
                      <Text textAlign="center">
                        {currentTab === 0
                          ? tabData[0].label
                          : currentTab === 1
                          ? tabData[1].label
                          : currentTab === 2
                          ? tabData[2].label
                          : currentTab === 3
                          ? tabData[3].label
                          : tabData[4].label}{" "}
                        whitelist not exists!
                      </Text>
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
                                borderY: "1px solid rgba(255, 255, 255, 0.4)",
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
      <Box className="history-table-footer-container" mt="24px">
        <Box display="flex" gap="8px">
          <IconButton
            variant="outline"
            color="#FFFFFF"
            onClick={() => previousPage()}
          >
            <IoIosArrowBack />
          </IconButton>
          <IconButton variant="outline" color="#FFFFFF" disabled="disabled">
            <span
              style={{
                color: "#FFFFFF",
              }}
            >
              {currentPage}
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
      </Box>
      {/* modal */}
      <AddWhitelistModal
        isOpen={modalAddwhitelistVisible}
        onClose={() => setModalAddwhitelistVisible(false)}
      />
      <UpdateWhitelistModal />
    </SectionContainer>
  );
};

export default WhitelistManager;
