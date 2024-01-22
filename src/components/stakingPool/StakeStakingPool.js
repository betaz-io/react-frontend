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
import {
  execContractQuery,
  execContractTx,
  execContractTxAndUpdateHistoryStaking,
} from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import betaz_token_contract from "utils/contracts/betaz_token";
import { useModal } from "contexts/useModal";
import { clientAPI } from "api/client";
import { fetchPendingUnstake } from "store/slices/stakingSlide";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const StakingPool = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [stakeValue, setStakeValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { stakingPoolModalVisible, setStakingPoolModalVisible } = useModal();
  const onCloseStakingPoolModal = () => setStakingPoolModalVisible(false);

  /** Stake token */
  const onChangeStakeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let stakeValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      stakeValue = parseFloat(value);
      if (stakeValue < 0) stakeValue = 1;
      if (
        stakeValue > formatChainStringToNumber(currentAccount?.balance?.betaz)
      ) {
        toast.error("Not enough Balance!");
        setStakeValue(
          formatChainStringToNumber(currentAccount?.balance?.betaz)
        );
      } else {
        setStakeValue(value);
      }
    }
  });

  const stake = async () => {
    if (stakeValue === "" || stakeValue == 0) {
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

      const checkReward = await execContractQuery(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getRewardStarted"
      );

      if (checkReward?.toHuman().Ok) {
        toast.error("Reward started!");
        setIsLoading(false);
        return;
      }

      // approve token
      const toastApprove = toast.loading("Approving ...");
      let allowance = await execContractTx(
        currentAccount,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "psp22::increaseAllowance",
        staking_pool_contract.CONTRACT_ADDRESS,
        convertToBalance(stakeValue)
      );
      await delay(3000);
      toast.dismiss(toastApprove);

      if (allowance && currentAccount?.address) {
        const toastStake = toast.loading("Staking ...");
        let stakeAmount = parseFloat(stakeValue);
        const result = await execContractTxAndUpdateHistoryStaking(
          "Stake",
          stakeAmount,
          currentAccount,
          staking_pool_contract.CONTRACT_ABI,
          staking_pool_contract.CONTRACT_ADDRESS,
          0,
          "stake",
          convertToBalance(stakeAmount)
        );
        if (result) {
          await delay(3000);
          toast.dismiss(toastStake);

          dispatch(fetchPendingUnstake(currentAccount));
        } else toast.dismiss(toastStake);
      }
    } catch (error) {
      // toast.dismiss(toastUnstake);
      setIsLoading(false);
      console.log(error);
    }
    // await delay(2000);
    setStakeValue(0);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        size="full"
        isCentered
        isOpen={stakingPoolModalVisible}
        onClose={onCloseStakingPoolModal}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent className="deposit-modal-container">
          <ModalBody display="flex" padding="0px">
            <Box className="deposit-modal-box-container">
              <Box className="deposit-modal-box">
                <Flex justify="space-between">
                  <Text className="linear-text-color deposit-modal-box-title">
                    Stake
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
                {/* Stake */}
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
                      <Text>Stake</Text>
                      <Flex className="deposit-box-amount-input">
                        <Input
                          focusBorderColor="transparent"
                          sx={{ border: "0px" }}
                          value={stakeValue}
                          onChange={onChangeStakeValue}
                          // type="Number"
                        />
                      </Flex>
                    </Box>
                    <CommonButton
                      onClick={() => stake()}
                      text="Stake"
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

export default memo(StakingPool);
