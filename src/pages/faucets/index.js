import {
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    Image,
    Input,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
  import { SectionContainer } from "components/container";
  // import betaz_token from "utils/contracts/betaz_token_calls";
  import sale_pool from "utils/contracts/sale_pool_calls";
  import { useState, useCallback, useEffect, useRef } from "react";
  import toast from "react-hot-toast";
  import { useSelector, useDispatch } from "react-redux";
  import { fetchUserBalance, fetchBuyStatus } from "store/slices/substrateSlice";
  import { formatTokenBalance, isValidAddressPolkadotAddress } from "utils";
  import { clientAPI } from "api/client";
  import { convertTimeStampToNumber, getDomainToAddress } from "utils";
  import CommonButton from "components/button/commonButton";
  import useInterval from "hooks/useInterval";
  import BuyTokenButton from "components/button/buyTokenButton";
  import DepositBG from "assets/img/deposit-home-bg.png";
  
  // css
  import { formatNumDynDecimal } from "utils";
  import { delay } from "utils";
  import { useQuery } from "react-query";
import BETAZFooter from "components/Footer";
  
  const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;
  
  const FaucetPage = () => {
    const dispatch = useDispatch();
    const { currentAccount, buyStatus } = useSelector((s) => s.substrate);
    const [maxbuyAmount, setMaxbuyAmount] = useState(10);
    const [azeroAmount, setAzeroAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenRatio, setTokenRatio] = useState(0);
    const [address, setAddress] = useState("");
  
    /*************** Count down time ********************/
    let endTimeNumber = convertTimeStampToNumber(buyStatus?.endTime);
  
    const dataQuery = useQuery(["query-buy-status"], async () => {
      await new Promise(async (resolve) => {
        await dispatch(fetchBuyStatus());
        resolve();
      });
    });
  
    useInterval(() => {
      dataQuery.refetch();
    }, 7000);
  
    /*************** End Count down time ********************/
  
    /*************** Buy token ******************************/
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
  
    const faucet = async () => {
      const difference = endTimeNumber - +new Date();
  
      const azeroIdAddress = await getDomainToAddress(address);
      let receiver;
  
      if (isValidAddressPolkadotAddress(azeroIdAddress))
        receiver = azeroIdAddress;
      else receiver = address;
  
      if (
        !isValidAddressPolkadotAddress(receiver) ||
        receiver !== currentAccount.address
      ) {
        toast.error("Invalid address");
        return;
      }
      if (difference <= 0) {
        toast.error("End time fauset!");
        return;
      }
      if (!buyStatus?.status) {
        toast.error("Can not fauset!");
        return;
      }
      setIsLoading(true);
      if (currentAccount?.address) {
        try {
          const result = await sale_pool.faucet(currentAccount, 100);
          if (result) {
            toast.success(`fauset BetAZ success`);
            setAddress("");
            getMaxbuy();
          }
        } catch (err) {
          console.log({ err });
        }
        setIsLoading(false);
      }
      await delay(2000);
      dispatch(fetchUserBalance({ currentAccount }));
    };
  
    const onChangeAddress = useCallback((e) => {
      const { value } = e.target;
      setAddress(value);
    });
  
    useEffect(() => {
      getMaxbuy();
    }, [onChangeToken]);
  
    /*************** End Buy token ******************************/
    return (
      <Box maxW={"100%"} overflowX="hidden">
        <Box bg="#0D171B">
          <SectionContainer
            // aspectRatio={1.8}
            bgImage={DepositBG}
            bgRepeat="no-repeat"
            bgPosition="center"
            bgSize="cover"
            pt={{ base: "24px", sm: "48px" }}
            id="section-deposit"
            pb="48px"
          >
            <Heading className="heading" fontSize={{ base: "24px", sm: "48px" }}>
              BETAZ faucet
            </Heading>
            <Flex direction="column" justify="center" mt="24px">
              <Box className="deposit-box-container">
                <Text
                  className="deposit-box-title"
                  fontSize={{ base: "20px", sm: "24px" }}
                >
                  Faucet
                </Text>
                <Box className="deposit-box-amount-box">
                  <Text>Address</Text>
                  <Flex className="deposit-box-amount-input">
                    <Input
                      focusBorderColor="transparent"
                      sx={{ border: "0px" }}
                      value={address}
                      onChange={onChangeAddress}
                      type="text"
                    />
                  </Flex>
                </Box>
                <Flex direction="column" alignItems="center" mt="24px">
                  <BuyTokenButton
                    onClick={() => faucet()}
                    text="Make it rain!"
                    isLoading={isLoading}
                    date={endTimeNumber}
                    max={maxbuyAmount}
                    status={buyStatus?.status}
                  />
                  <Text mt="24px" fontSize={{ base: "14px", sm: "16px" }}>
                    By Clicking your agree with our
                  </Text>
                  <Text
                    className="linear-text-color-01 term-aggreement-text"
                    fontSize={{ base: "14px", sm: "20px" }}
                  >
                    Terms and Conditions, Privacy Policy
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </SectionContainer>
        </Box>
        <BETAZFooter />
      </Box>
    );
  };
  
  export default FaucetPage;
  