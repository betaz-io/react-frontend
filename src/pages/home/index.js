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
import AppLogoText from "assets/img/app-logo-text.png";
import AvatarImage from "assets/img/avatar.png";
import ContactBg from "assets/img/contact-bg.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import DepositBG from "assets/img/deposit-home-bg.png";
import HomeBannerBG from "assets/img/home-banner-bg.png";
import HomeBannerBGTablet from "assets/img/home-banner-bg-tablet.png";
import RoadmapBG from "assets/img/roadmap-bg.png";
import TeamBG from "assets/img/team-bg.png";
import TokenomicBG from "assets/img/tokenomic-bg.png";
import TokenomicCup from "assets/img/tokenomic-cup.png";
import { NavbarLandingPage } from "components/Navbar/NavbarLandingPage";
import { SectionContainer } from "components/container";
import { AppIcon, TokenIcon } from "components/icons";
import { LuAtSign } from "react-icons/lu";
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
import BETAZCountDown from "components/countdown/CountDown";
import StakeStakingPool from "components/stakingPool/StakeStakingPool";
import BuyTokenButton from "components/button/buyTokenButton";
import UnstakeStakingPool from "components/stakingPool/UnstakeStakingPool";
import { EclipseIcon } from "components/icons";
import { SmallRecIcon } from "components/icons";
import { BigRecIcon } from "components/icons";
import useCheckMobileScreen from "hooks/useCheckMobileScreen";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";

// css
import "./styles.css";
import SliderTeam from "./sliderTeam/SliderTeam";
import { formatNumDynDecimal } from "utils";
import { delay } from "utils";
import { useQuery } from "react-query";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const HomePage = () => {
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

  const buy = async () => {
    const difference = endTimeNumber - +new Date();
    if (azeroAmount === "" || azeroAmount == 0) {
      toast.error("Amount must be greater than 0!");
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
          getMaxbuy();
        }
      } catch (err) {
        console.log({ err });
      }
      setIsLoading(false);
    }
  };

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

  /*************** Send mail **********************************/
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendEmail = async (email) => {
    const match = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const options = {
      email: email,
      subject: "Welcome to BETAZ",
      text: "Thanks for subscribe!",
    };

    if (email === "") toast.error("Email is required!");
    else if (!match) {
      toast.error("Email is invalid!");
    } else {
      setIsLoading(true);
      const toastSendEmail = toast.loading("Sending email...");
      const emailExist = await clientAPI("post", "/getEmailExist", {
        email: email,
      });

      if (emailExist === email) {
        toast.error("Email already exists!");
      } else {
        const subscribe = await clientAPI("post", "/sendEmail", options);
        if (subscribe) toast.success("subcribe success");
      }
      setIsLoading(false);
      toast.dismiss(toastSendEmail);
    }
  };
  /*************** End Send mail ******************************/

  const fomartMaxBuyAmount = () => {
    if (maxbuyAmount == 0) return "0";
    else return formatNumDynDecimal(maxbuyAmount, 4);
  };

  const colorMaxBuyAmount = maxbuyAmount == 0 ? null : "linear-text-color-01";
  const isMobile = useCheckMobileScreen(576);
  const isTablet = useCheckMobileScreen(1200);

  return (
    <Box maxW={"100%"} overflowX="hidden">
      <Box
        className="landing-page-banner-container"
        bgImage={isMobile ? HomeBannerBGTablet : HomeBannerBG}
        minH={{ base: "600px", md: "unset" }}
      >
        <NavbarLandingPage />
        <Flex
          direction="column"
          h="full"
          alignItems="center"
          pt={isMobile ? "48px" : "calc(1/4 * 100vh)"}
          pb="48px"
          className="landing-page-banner-content-container"
        >
          <Text
            id={isMobile ? "text-1-mobile" : "text-1"}
            maxWidth={{ base: "320px", sm: "576px", md: "992px" }}
            className="landing-page-banner-text linear-text-color-01"
          >
            What is BetAZ ?
            <br />
            An online gaming and betting platform running on Aleph Zero
            Blockchain.
          </Text>
          <Text
            id={isMobile ? "text-2-mobile" : "text-2"}
            className="landing-page-banner-text"
          >
            Start earning from your bets with BetAZ - available 24/7
            <br />
            and always ready to serve you.
          </Text>
          <Flex
            mt="32px"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "12px" : "24px"}
          >
            <Button
              className="landing-page-banner-button"
              px={isMobile ? "24px" : "48px"}
              bg="#122126"
              color="#F7F7F8"
              boxShadow="4px 4px 6px 0px rgba(255, 255, 255, 0.20) inset"
              _hover={{ color: "#000", bg: "#E2E8F0" }}
              onClick={() => window.open("/app", "_blank")}
            >
              Testnet Demo
            </Button>
            <Button
              px={isMobile ? "24px" : "48px"}
              bg="#122126"
              color="#F7F7F8"
              boxShadow="4px 4px 6px 0px rgba(255, 255, 255, 0.20) inset"
              _hover={{ color: "#000", bg: "#E2E8F0" }}
              className="landing-page-banner-button"
              onClick={() => toast.success("Comming soon!")}
            >
              Mainnet Access
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box bg="#0D171B">
        <SectionContainer
          aspectRatio={1.8}
          bgImage={TokenomicBG}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          id="section-tokenomic"
          pt={{ base: "24px", sm: "138px" }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }}>
            <Box>
              <Heading
                className="heading"
                pb={{ base: "24px", sm: "48px" }}
                fontSize={{ base: "24px", sm: "48px" }}
              >
                BetAZ Tokenomics
              </Heading>
              <Flex className="token-infor-container">
                <Box className="token-infor-content-container">
                  <Text className="token-infor-content-title">Token Name:</Text>
                  <Text
                    className="token-infor-text"
                    fontSize={{ base: "16px", sm: "24px" }}
                  >
                    BetAZ TOKEN
                  </Text>
                </Box>
                <Box width="2px" bg="#706A78" />
                <Box className="token-infor-content-container" ml="12px">
                  <Text className="token-infor-content-title">
                    Token Symbol:
                  </Text>
                  <Flex justify="center" alignItems="center" mt="12px">
                    <TokenIcon size={{ base: "20px", sm: "32px" }} />
                    <Text
                      className="token-infor-symbol"
                      fontSize={{ base: "16px", sm: "24px" }}
                    >
                      BetAZ
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <SimpleGrid
                className="tokenomic-container"
                columns={3}
                spacing="12px"
              >
                {[
                  {
                    color: "#70FF01",
                    value: 5,
                    label: "Private Invesment",
                  },
                  {
                    color: "#C7840F",
                    value: 3,
                    label: "Airdrop & Marketing",
                  },
                  {
                    color: "#EC486F",
                    value: 5,
                    label: "Team",
                  },
                  {
                    color: "#A649FF",
                    value: 10,
                    label: "Developement",
                  },
                  {
                    color: "#6366F1",
                    value: 27,
                    label: "Reward Pool",
                  },
                  {
                    color: "#1AE0A6",
                    value: 50,
                    label: "Core Pool",
                  },
                ].map((e, index) => (
                  <Box
                    className="tokenomic-item"
                    key={`tokenomic-item-${index}`}
                  >
                    <Box
                      className="tokenomic-item-color"
                      bg={e.color}
                      w={{ base: "100%", sm: "60%" }}
                    />
                    <Text
                      className="tokenomic-item-value"
                      fontSize={{ base: "16px", sm: "18px" }}
                    >{`${e.value}%`}</Text>
                    <Text
                      className="tokenomic-item-describle"
                      fontSize={{ base: "10px", sm: "14px" }}
                    >
                      {e.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            <Flex justify="center">
              <Image
                height={{ sm: "770px" }}
                alt="Tokenomic-cup"
                src={TokenomicCup}
                loading="lazy"
              />
            </Flex>
          </SimpleGrid>
        </SectionContainer>
        {/* <SectionContainer
          aspectRatio={1.8}
          bgImage={DepositBG}
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="cover"
          pt={{ base: "24px", sm: "48px" }}
          id="section-deposit"
          pb="84px"
        >
          <Heading className="heading" fontSize={{ base: "24px", sm: "48px" }}>
            Public Sale
          </Heading>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: "24px", md: "100px" }}
            mt="24px"
          >
            <Flex direction="column" justify="center">
              <Box className="deposit-box-container">
                <Text
                  className="deposit-box-title"
                  fontSize={{ base: "20px", sm: "24px" }}
                >
                  Acquire BetAZ Token
                </Text>
                <Box className="deposit-box-amount-box">
                  <Text>Amount</Text>
                  <Flex className="deposit-box-amount-input">
                    <Input
                      focusBorderColor="transparent"
                      sx={{ border: "0px" }}
                      value={azeroAmount}
                      onChange={onChangeToken}
                      // type="number"
                    />
                    <Flex
                      w="120px"
                      alignItems="center"
                      gap={1}
                      pl="4px"
                      borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                    >
                      <TokenIcon size="18px" />
                      BetAZ
                    </Flex>
                  </Flex>
                </Box>
                <Flex direction="column" alignItems="center" mt="24px">
                  <BuyTokenButton
                    onClick={() => buy()}
                    text="Acquire BetAZ"
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

            <Flex
              maxW="600px"
              aspectRatio={1}
              bgImage={DepositAmountCircle}
              bgRepeat="no-repeat"
              bgSize="cover"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <SimpleGrid
                spacing={{ base: "18px", sm: "32px" }}
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
          </SimpleGrid>
        </SectionContainer> */}
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
        <SectionContainer
          py={{ base: "24px", sm: "48px" }}
          // aspectRatio={1}
          bgImage={RoadmapBG}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          id="section-roadmap"
        >
          <Heading className="heading" fontSize={{ base: "24px", sm: "48px" }}>
            Roadmap
          </Heading>
          <Box pb="24px" position="relative">
            <BigRecIcon
              size="34px"
              sx={{
                position: "absolute",
                top: "-33px",
                left: "50%",
                zIndex: "2",
                transform: "translateX(-50%)",
              }}
            />
            <Box
              w="2px"
              h="90%"
              backgroundColor="#1BBEF5"
              sx={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            ></Box>
            <SimpleGrid
              alignItems="center"
              display="flex"
              flexDirection="column"
              // spacing="24px"
            >
              <Box
                className="shining-container"
                mt={{ base: "12px", sm: "24px" }}
              >
                <EclipseIcon text={"Q4 - 2023"} />
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
                minW={{ base: "100%", md: "600px" }}
                position="relative"
              >
                <BigRecIcon
                  size={"24px"}
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Box className="roadmap-title-container">
                  <Text>Infrastructure Development</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {["Debut Testnet Demo", "UI/UX Revamp"].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box
                className="shining-container"
                mt={{ base: "12px", sm: "24px" }}
              >
                <EclipseIcon text={"Q1 - 2024"} />
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
                minW={{ base: "100%", md: "600px" }}
                position="relative"
              >
                <BigRecIcon
                  size={"24px"}
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Box className="roadmap-title-container">
                  <Text>Beta Launch</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Airdrop Campaigns",
                    "Early Contributor Program",
                    "Mainnet Launch",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box
                className="shining-container"
                mt={{ base: "12px", sm: "24px" }}
              >
                <EclipseIcon text={"Q2 - 2024"} />
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
                minW={{ base: "100%", md: "600px" }}
                position="relative"
              >
                <BigRecIcon
                  size={"24px"}
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Box className="roadmap-title-container">
                  <Text>Ecosystem Expansion</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {["Multi-Blockchain Support", "Mobile App Development"].map(
                    (e) => (
                      <Flex alignItems="center">
                        <Box className="diamon-icon" />
                        <Text color="#A4B0B6">{e}</Text>
                      </Flex>
                    )
                  )}
                </SimpleGrid>
              </Box>
              <Box
                className="shining-container"
                mt={{ base: "12px", sm: "24px" }}
              >
                <EclipseIcon text={"Q3 - 2024"} />
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
                minW={{ base: "100%", md: "600px" }}
                position="relative"
              >
                <BigRecIcon
                  size={"24px"}
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Box className="roadmap-title-container">
                  <Text>AI Trading</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {["Bring more games to the platform"].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              {/* <Box
                className="shining-container"
                mt={{ base: "12px", sm: "24px" }}
              >
                <EclipseIcon text={"Q4 - 2024"} />
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
                minW={{ base: "100%", md: "600px" }}
                position="relative"
              >
                <BigRecIcon
                  size={"24px"}
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Box className="roadmap-title-container">
                  <Text>Mobile App Development</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "IOS and Android App Development Kickoff",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box> */}
            </SimpleGrid>
          </Box>
        </SectionContainer>
        <SectionContainer
          aspectRatio={1.8}
          bgImage={TeamBG}
          bgRepeat="no-repeat"
          bgSize="cover"
          pt={{ base: "24px", sm: "48px" }}
          pb={{ base: "42px", sm: "54px" }}
          id="section-team-member"
        >
          <Heading
            className="heading"
            textAlign="center"
            fontSize={{ base: "24px", sm: "48px" }}
          >
            Team Member
          </Heading>
          {/* carosel */}
          <SliderTeam />
        </SectionContainer>
        <SectionContainer
          pb={{ base: "48px", sm: "85px" }}
          id="section-contact-us"
        >
          <FormControl>
            <Flex
              bgImage={ContactBg}
              className="contact-container"
              padding={{ base: "24px" }}
            >
              <Text
                className="contact-title linear-text-color-01"
                fontSize={{ base: "24px", sm: "48px" }}
              >
                Keep in touch
              </Text>
              <Box>
                <Text
                  className="contact-description"
                  fontSize={{ base: "16px", sm: "20px" }}
                  fontWeight={{ base: "500", sm: "700" }}
                >
                  Get updates directly to your inbox. Helpful newsletters. No
                  spam.
                </Text>
                <Flex className="contact-email-container">
                  <Flex className="contact-email-icon">
                    <LuAtSign size="24px" color="#FFF" />
                  </Flex>
                  <Input
                    type="email"
                    value={input}
                    onChange={handleInputChange}
                    focusBorderColor="transparent"
                    className="contact-email-input"
                    placeholder="Enter your email"
                  />
                </Flex>
              </Box>
              <Button
                px="24px"
                minW={{ base: "100%", sm: "300px" }}
                height="44px"
                isDisabled={isLoading}
                onClick={() => handleSendEmail(input)}
              >
                Subscribe
              </Button>
            </Flex>
          </FormControl>
        </SectionContainer>
      </Box>
    </Box>
  );
};

export default HomePage;
