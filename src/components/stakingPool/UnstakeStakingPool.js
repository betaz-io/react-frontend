import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { AppIcon } from "components/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import toast from "react-hot-toast";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import {
  formatTokenBalance,
  formatChainStringToNumber,
  convertTimeStampToNumber,
  convertToBalance,
  delay,
} from "utils";
import CommonButton from "components/button/commonButton";
import { execContractQuery, execContractTx } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import { useModal } from "contexts/useModal";
import staking_pool_calls from "utils/contracts/staking_pool_calls";
import { clientAPI } from "api/client";
import {
  fetchPendingUnstake,
} from "store/slices/stakingSlide";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const StakingPool = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [unstakeValue, setUnstakeValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { unstakeStakingPoolModalVisible, setUnstakeStakingPoolModalVisible } =
    useModal();
  const onCloseStakingPoolModal = () =>
    setUnstakeStakingPoolModalVisible(false);

  /** Request Unstake */
  const onChangeRequestunstakeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let rqunstakeValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      rqunstakeValue = parseFloat(value);
      if (rqunstakeValue < 0) rqunstakeValue = 1;
      if (
        rqunstakeValue >
        formatChainStringToNumber(currentAccount?.balance?.stake)
      ) {
        toast.error("Not enough Balance!");
        setUnstakeValue(
          formatChainStringToNumber(currentAccount?.balance?.stake)
        );
      } else {
        setUnstakeValue(value);
      }
    }
  });

  const requestUnstake = async () => {
    if (unstakeValue === "" || unstakeValue == 0) {
      toast.error("invalid inputs!");
      return;
    }
    setIsLoading(true);

    try {
      // check reward locked
      const checkLock = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      );

      if (checkLock?.toHuman().Ok) {
        toast.error("Reward locked!");
        setIsLoading(false);
        return;
      }

      const toastUnstake = toast.loading("Request unstake ...");
      let unstakeAmount = parseFloat(unstakeValue);
      const result = await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "requestUnstake",
        convertToBalance(unstakeAmount)
      );
      if (result) {
        await delay(3000);
        toast.dismiss(toastUnstake);

        // get Time resquest unstake
        await clientAPI("post", "/updatePendingUnstake", {
          caller: currentAccount?.address,
        });
        dispatch(fetchPendingUnstake(currentAccount))
      } else toast.dismiss(toastUnstake);
    } catch (error) {
      // toast.dismiss(toastUnstake);
      setIsLoading(false);
      console.log(error);
    }

    // await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        size="full"
        isCentered
        isOpen={unstakeStakingPoolModalVisible}
        onClose={onCloseStakingPoolModal}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="deposit-modal-container">
          <ModalBody display="flex" padding="0px">
            <Box className="deposit-modal-box-container">
              <Box className="deposit-modal-box">
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    Unstake
                  </Text>
                  <Flex
                    w="28px"
                    h="28px"
                    justify="center"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() => onCloseStakingPoolModal()}
                  >
                    <IoMdClose color="#FFF" size="20px" />
                  </Flex>
                </Flex>
                {/* Unstake */}
                <SimpleGrid spacing="24px" mt="24px">
                  <Flex flexDirection="column" gap="24px">
                    <Box className="deposit-box-amount-box">
                      <Text>Your Betaz token Balance</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.betaz}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Your Staked amount</Text>
                      <Flex className="deposit-box-amount-input">
                        <Text className="linear-text azero-amount">
                          {currentAccount?.balance?.stake}
                        </Text>
                        <AppIcon size="14px" padding="3px" />
                      </Flex>
                    </Box>
                    <Box className="deposit-box-amount-box">
                      <Text>Requets unstake</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          onChange={onChangeRequestunstakeValue}
                          value={unstakeValue}
                          // type="Number"
                        />
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => requestUnstake()}
                      text="Requets unstake"
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StakingPool;
