import {
  Box,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import depositBGLightStage from "assets/img/deposit-bg-light-stage.png";
import AppLogoText from "assets/img/app-logo-text.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import "./styles.css";
import { IoMdClose } from "react-icons/io";
import { AppIcon, AzeroIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
// import betaz_token from "utils/contracts/betaz_token_calls";
import sale_pool from "utils/contracts/sale_pool_calls";
import betaz_core from "utils/contracts/betaz_core_calls";
import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { formatTokenBalance } from "utils";
import { convertTimeStampToNumber } from "utils";
import CommonButton from "components/button/commonButton";
import useInterval from "hooks/useInterval";
import { fetchBuyStatus } from "store/slices/substrateSlice";
import BETAZCountDown from "components/countdown/CountDown";
import BuyTokenButton from "components/button/buyTokenButton";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";
import { formatNumDynDecimal } from "utils";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const DepositModal = ({ visible, onClose }) => {
  const [tabIndex, setTabIndex] = useState(1);
  const dispatch = useDispatch();
  const { currentAccount, poolBalance, buyStatus } = useSelector(
    (s) => s.substrate
  );
  const [maxbuyAmount, setMaxbuyAmount] = useState(10);
  const [azeroAmount, setAzeroAmount] = useState(0);
  const [holdAmount, setHoldAmount] = useState(0);
  const [holdAmountVal, setHoldAmountVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenRatio, setTokenRatio] = useState(0);

  /** Count down time */
  let endTimeNumber = convertTimeStampToNumber(buyStatus?.endTime);
  useInterval(() => {
    dispatch(fetchBuyStatus());
  }, 5000);

  /** Buy token */
  const getMaxbuy = async () => {
    const [amountMaxBuy, tokenRatio] = await Promise.all([
      await sale_pool.getSalePoolRemainingAmount(defaultCaller, "Sale"),
      await sale_pool.getTokenRatio(defaultCaller, "Sale"),
    ]);
    setMaxbuyAmount(parseFloat(amountMaxBuy?.replaceAll(",", "")).toFixed(4));
    setTokenRatio(tokenRatio);
  };

  const onChangeToken = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let tokenValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      tokenValue = parseFloat(value);
      if (tokenValue < 0) tokenValue = 1;
      if (tokenValue > maxbuyAmount) {
        toast.error("Not enough Balance!");
        setAzeroAmount(maxbuyAmount);
      } else {
        setAzeroAmount(value);
      }
    }
  });

  const buy = async () => {
    const difference = endTimeNumber - +new Date();
    if (azeroAmount === "") {
      toast.error("invalid inputs!");
      return;
    }
    if (difference <= 0) {
      toast.error("End time buy!");
      return;
    }
    if (!buyStatus?.status) {
      toast.error("Can not buy!");
      return;
    }
    setIsLoading(true);
    if (currentAccount?.address) {
      try {
        let fee = parseFloat(azeroAmount) * parseFloat(tokenRatio);
        // check whitelist info
        let whitelistInfo = await execContractQuery(
          defaultCaller,
          sale_pool_contract.CONTRACT_ABI,
          sale_pool_contract.CONTRACT_ADDRESS,
          0,
          "salePoolTrait::getWhitelistInfo",
          "Sale",
          currentAccount?.address
        );
        if (whitelistInfo?.toHuman().Ok) {
          let price =
            whitelistInfo?.toHuman().Ok?.price?.replaceAll(",", "") / 10 ** 12;
          console.log(price);
          fee = parseFloat(azeroAmount) * parseFloat(price);
        }

        const result = await sale_pool.buy(
          currentAccount,
          parseFloat(azeroAmount),
          fee
        );
        if (result) {
          toast.success(`Buy BetAZ success`);
          dispatch(fetchUserBalance({ currentAccount }));
          dispatch(fetchBalance());
          getMaxbuy();
        }
      } catch (err) {
        console.log({ err });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMaxbuy();
  }, [onChangeToken]);

  /** Withdraw azero */
  const getHoldAmount = async () => {
    const holdAmount = await betaz_core.getHoldAmountPlayers(currentAccount);
    if (holdAmount) setHoldAmount(holdAmount);
    else setHoldAmount(0);
  };

  const withdraw = async () => {
    setIsLoading(true);
    if (currentAccount?.address) {
      if (holdAmountVal === "") {
        toast.error("invalid inputs!");
        return;
      }
      if (!holdAmount) {
        toast.error("You not hold amount!");
        setIsLoading(false);
        return;
      } else if (poolBalance?.core == 0) {
        toast.error("Pool not enough balance!");
        setIsLoading(false);
        return;
      } else {
        let amount = parseFloat(holdAmountVal);
        const result = await betaz_core.withdrawHoldAmount(
          currentAccount,
          amount
        );
        if (result) {
          toast.success(`Withdraw success`);
          dispatch(fetchUserBalance({ currentAccount }));
          dispatch(fetchBalance({ currentAccount }));
          getHoldAmount();
        }
        setIsLoading(false);
      }
    }
  };

  const onChangeholdAmount = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let holdValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      holdValue = parseFloat(value);
      if (holdValue < 0) holdValue = 1;
      if (holdValue > holdAmount) {
        toast.error("Not enough Balance!");
        setHoldAmountVal(holdAmount);
      } else {
        setHoldAmountVal(value);
      }
    }
  });

  useEffect(() => {
    getHoldAmount();
  }, [currentAccount?.address]);

  const fomartMaxBuyAmount = () => {
    if (maxbuyAmount == 0) return "0";
    else return formatNumDynDecimal(maxbuyAmount, 4);
  };

  const colorMaxBuyAmount = maxbuyAmount == 0 ? null : "linear-text-color-01";
  const isMobile = useCheckMobileScreen(992);
  return (
    <>
      <Modal size="full" isCentered isOpen={visible} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          className="deposit-modal-container"
          maxW={{
            base: "calc(100vw - 48px) !important",
            sm: "calc(100vw - 120px) !important",
          }}
        >
          <ModalBody
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            padding="0px"
            justifyContent={isMobile ? "center" : "unset"}
            alignItems={isMobile ? "center" : "unset"}
          >
            <Box
              className="deposit-modal-container"
              w={{ base: "100%", md: "100%" }}
              // w={{ base: "100%", md: "50%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                className="deposit-modal-box"
                w={{ base: "100%", xl: "calc(100vw * 1 / 3)" }}
                maxW={{ base: "100%", xl: "600px" }}
              >
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    {/* Deposit / Withdraw */}
                    Withdraw
                  </Text>
                  <Flex
                    w="28px"
                    h="28px"
                    justify="center"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => onClose()}
                  >
                    <IoMdClose color="#FFF" size="20px" />
                  </Flex>
                </Flex>
                {/* <Flex className="tab-container">
                  <Box
                    className={`tab-button ${
                      tabIndex == 0 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(0)}
                  >
                    Deposit
                  </Box>
                  <Box
                    className={`tab-button ${
                      tabIndex == 1 && "tab-button-active"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Withdraw
                  </Box>
                </Flex> */}
                {/* buy */}
                <SimpleGrid
                  display={tabIndex === 0 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your azero balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.azero}
                        </Text>
                        <AzeroIcon
                          size={{ base: "11px", sm: "11px" }}
                          padding={{
                            base: "0px 6px 0px 6px",
                            sm: "0px 6px 0px 6px",
                          }}
                        />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Deposit</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          value={azeroAmount}
                          onChange={onChangeToken}
                          // type="Number"
                        />
                        <Flex
                          cursor="pointer"
                          w="100px"
                          alignItems="center"
                          textAlign="center"
                          flexDirection="column"
                          borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                          onClick={() => setAzeroAmount(maxbuyAmount)}
                        >
                          Max
                        </Flex>
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => buy()}
                      text="Deposit"
                      isLoading={isLoading}
                    />
                    <Box>
                      <Text textAlign="center">
                        By Clicking your agree with our
                      </Text>
                      <Text
                        className="linear-text-color-01 term-aggreement-text"
                        textAlign="center"
                      >
                        Terms and Conditions, Privacy Policy
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
                {/* withdraw */}
                <SimpleGrid
                  display={tabIndex === 1 ? "block" : "none"}
                  spacing="24px"
                  mt="24px"
                >
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your hold amount balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {holdAmount}
                        </Text>
                        <AzeroIcon
                          size={{ base: "11px", sm: "11px" }}
                          padding={{
                            base: "0px 6px 0px 6px",
                            sm: "0px 6px 0px 6px",
                          }}
                        />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Hold amount</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          onChange={onChangeholdAmount}
                          value={holdAmountVal}
                          // type="Number"
                        />
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => withdraw()}
                      text="Withdraw hold amount"
                      isLoading={isLoading}
                    />
                    <Box>
                      <Text textAlign="center">
                        By Clicking your agree with our
                      </Text>
                      <Text
                        className="linear-text-color-01 term-aggreement-text"
                        textAlign="center"
                      >
                        Terms and Conditions, Privacy Policy
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>
            {/* {isMobile ? null : (
              <Box
                className="deposit-modal-circle-container"
                bgImage={depositBGLightStage}
              >
                <Flex
                  bgImage={DepositAmountCircle}
                  className="deposit-modal-circle-content"
                >
                  <SimpleGrid
                    spacing="32px"
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Image
                      height={{ base: "20px", sm: "32px" }}
                      alt="app-logo-text"
                      src={AppLogoText}
                    />
                    <Text
                      className="deposit-circle-quote"
                      fontSize={{ base: "14px", sm: "24px" }}
                    >
                      Easy way for crypto Play
                    </Text>
                    <Text
                      className={`deposit-circle-amount ${colorMaxBuyAmount}`}
                      color="#a4b0b6"
                      fontSize={{ base: "28px", sm: "48px" }}
                    >
                      ${!isNaN(maxbuyAmount) ? fomartMaxBuyAmount() : 0}
                    </Text>
                    <Box>
                      <Text
                        className="deposit-circle-finish-title"
                        fontSize={{ base: "10px", sm: "16px" }}
                      >
                        Finishes in:
                      </Text>
                      <BETAZCountDown date={endTimeNumber} />
                    </Box>
                  </SimpleGrid>
                </Flex>
              </Box>
            )} */}

            {/* {supportWallets?.map((e, index) => (
                <WalletItem data={e} key={`wallet-item-${index}`} />
              ))}
              {walletAccounts?.length > 0 && (
                <Box sx={{ marginTop: "16px" }}>
                  <Divider />
                  <Text
                    sx={{
                      color: "#1BECA7",
                      marginTop: "8px",
                      fontWeight: "512",
                      fontSize: "20px",
                    }}
                  >
                    Select Account
                  </Text>
                  {walletAccounts?.map((e, index) => {
                    return <AccountItem key={`account-item-${index}`} data={e} />;
                  })}
                </Box>
              )} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DepositModal;
