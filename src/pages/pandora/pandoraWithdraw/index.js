import {
  Box,
  Button,
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
import { useDispatch, useSelector } from "react-redux";
// import betaz_token from "utils/contracts/betaz_token_calls";
import pandora_pool from "utils/contracts/pandora_pool_calls";
import { useState, useCallback, useEffect, useRef, memo } from "react";
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
import pandora_pool_contract from "utils/contracts/pandora_pool";
import { formatNumDynDecimal } from "utils";
import { useQuery } from "react-query";
import PandoraCloseButton from "assets/img/PandoraCloseButton.svg";
import PandoraInput from "../components/Input";
import { useModal } from "contexts/useModal";
import { delay } from "utils";
import { useWallet } from "contexts/useWallet";
import { usePandoraRewardHistory } from "hooks/usePandoraRewardHistory";
import { IoCloseSharp } from "react-icons/io5";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraWithdrawModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const [holdAmount, setHoldAmount] = useState(0);
  const [holdAmountVal, setHoldAmountVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { setModalPandoraWithdrawVisible } = useModal();

  const getHoldAmount = async () => {
    const holdAmount = await pandora_pool.getHoldAmountPlayers(currentAccount);
    if (holdAmount) setHoldAmount(holdAmount);
    else setHoldAmount(0);
  };

  const { refetch: refetchPandoraRewardHistoryData } = usePandoraRewardHistory(
    currentAccount?.address
  );

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
        const result = await pandora_pool.withdrawWinAmount(
          currentAccount,
          amount
        );
        if (result) {
          await delay(3000);
          toast.success(`Withdraw success`);
          dispatch(fetchUserBalance({ currentAccount }));
          dispatch(fetchBalance({ currentAccount }));
          getHoldAmount();
          refetchPandoraRewardHistoryData();
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
      if (holdValue > parseFloat(holdAmount)) {
        toast.error("Not enough Balance!");
        setHoldAmountVal(holdAmount);
      } else {
        setHoldAmountVal(value);
      }
    }
  });

  useEffect(() => {
    if (api && currentAccount) getHoldAmount();
  }, [currentAccount, api]);
  const isMobile = useCheckMobileScreen(992);
  return (
    <>
      <Modal isOpen={visible} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          className="deposit-modal-container"
          maxW={{
            base: " !important",
            sm: "615px !important",
          }}
          overflow="hidden"
          borderRadius={{ base: "8px" }}
          // containerProps={{ justifyContent: 'flex-end', paddingRight: '60px', paddingTop: "120px" }}
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
              w={{ base: "100%", md: "600px" }}
              // w={{ base: "100%", md: "50%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              padding={{ base: "12px" }}
            >
              <Box
                className="pandora-btn-close"
                position="absolute"
                top="0px"
                right="0px"
                zIndex={3}
                onClick={() => setModalPandoraWithdrawVisible(false)}
                color={"white"}
                background={"#00D5C4"}
                borderBottomLeftRadius={"8px"}
                borderTopRightRadius={"8px"}
                sx={{
                  _hover: {
                    background: "#FC0000",
                  },
                }}
              >
                <IoCloseSharp size={"36px"} />
              </Box>
              <Box w="100%" h="100%" className="pandora-modal-overlay"></Box>
              <Box
                w="100%"
                className="pandora-modal-container"
                display="flex"
                flexDirection="column"
                gap="24px"
              >
                <Text className="pandora-modal-text-title" color="#FFA000">
                  WITHDRAW
                </Text>
                <Text
                  sx={{
                    fontWeight: "600",
                    fontSize: "20px",
                    // color:"#1beca7"
                  }}
                >
                  Hold Amount Balance:{" "}
                  <Text as={"span"} color={"#1beca7"}>
                    {holdAmount}
                  </Text>
                </Text>
                {/* <PandoraInput
                  text={"HOLD AMOUNT"}
                  topRightIcon={true}
                  value={holdAmount}
                  disabled={true}
                  opacity={"1 !important"}
                /> */}
                <PandoraInput
                  text={"ENTER AMOUNT"}
                  value={holdAmountVal}
                  bottomLeftIcon={true}
                  onChange={onChangeholdAmount}
                  showMax={true}
                  onClickMax={() => setHoldAmountVal(holdAmount)}
                />

                <CommonButton
                  onClick={() => withdraw()}
                  text="WITHDRAW"
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
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PandoraWithdrawModal;
