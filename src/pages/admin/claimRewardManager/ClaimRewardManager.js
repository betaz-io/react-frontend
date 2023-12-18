import { Box, Text, Flex, Switch, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { delay } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import betaz_core_contract from "utils/contracts/betaz_core";
import { useWallet } from "contexts/useWallet";
import { clientAPI } from "api/client";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const ClaimRewardManager = () => {
  const dispatch = useDispatch();
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { api } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const getState = async () => {
    const [locked, started] = await Promise.all([
      execContractQuery(
        currentAccount?.address,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getIsLocked"
      ),
      execContractQuery(
        currentAccount?.address,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getRewardStarted"
      ),
    ]);

    const lock = locked?.toHuman().Ok;
    setIsLocked(lock);
    const start = started?.toHuman().Ok;
    setIsStart(start);
  };

  const handleLock = async (state) => {
    if (state === isLocked) {
      toast.error("Invalid status!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      setIsLoading(true);
      await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::updateIsLocked",
        state
      );
      await delay(3000);
      setIsLocked(state);
      setIsLoading(false);
    }
  };

  const handleStart = async (state) => {
    if (state === isStart) {
      toast.error("Invalid status!");
      return;
    }

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
      toast.error("Reward is not locked!");
      return;
    }

    const toastCheckRole = toast.loading("Step 2: Check Role Admin ...");
    let hasRole = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );
    toast.dismiss(toastCheckRole);

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      setIsLoading(true);
      const toasthandle = toast.loading("Step 3: Updating ...");
      await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::updateStatusRewardDistribution",
        state
      );
      await delay(3000);
      toast.dismiss(toasthandle);
      setIsStart(state);
      setIsLoading(false);
    }
  };

  const handleTranfer = async () => {
    const stakingPoolAmount = await execContractQuery(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getStakingPoolAmount"
    );

    if (stakingPoolAmount.toHuman()?.Ok?.replaceAll(",", "") / 10 ** 12 == 0) {
      toast.error("Not enough balance!");
      return;
    }

    const toastCheckLock = toast.loading(
      "Step 1: Check reward distribution ..."
    );
    const checkLock = await execContractQuery(
      defaultCaller,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::getRewardStarted"
    );
    toast.dismiss(toastCheckLock);

    if (checkLock?.toHuman().Ok) {
      toast.error("Reward distribution is not started!");
      return;
    }

    const toastCheckRole = toast.loading("Step 2: Check Role Admin ...");
    let hasRole = await execContractQuery(
      currentAccount?.address,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "accessControl::hasRole",
      adminRole,
      currentAccount?.address
    );
    toast.dismiss(toastCheckRole);

    if (!hasRole?.toHuman().Ok) {
      toast.error("You not admin!");
      return;
    } else {
      setIsLoading(true);
      const toasthandle = toast.loading("Step 3: tranfer staking pool ...");
      await execContractTx(
        currentAccount,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "transferAndUpdateStakingPool"
      );
      await delay(3000);
      toast.dismiss(toasthandle);
      setIsLoading(false);
    }

    dispatch(fetchBalance());
  };

  useEffect(() => {
    if (api && currentAccount?.address) getState();
  }, [currentAccount, api]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Staking pool management</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Text textAlign="center">
            Reward status: <b>{isLocked ? "Locked" : "Not locked"}</b>
          </Text>
          <Text textAlign="center">
            Reward distribution: <b>{isStart ? "Started" : "Not started"}</b>
          </Text>
        </SimpleGrid>
      </Box>
      <Flex
        alignItems="center"
        mt="24px"
        justifyContent="start"
        gap="24px"
        flexWrap="wrap"
      >
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 1:</Text>
          <CommonButton
            text="Lock"
            isLoading={isLoading}
            onClick={() => handleLock(true)}
          />
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 2:</Text>
          <CommonButton
            text="Transfer staking pool"
            isLoading={isLoading}
            onClick={() => handleTranfer()}
          />
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 3:</Text>
          <Text textAlign="center">Run script set claimed status</Text>
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 4:</Text>
          <CommonButton
            text="Start reward distribution"
            isLoading={isLoading}
            onClick={() => handleStart(true)}
          />
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 5:</Text>
          <Text textAlign="center">Run script auto claim</Text>
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 6:</Text>
          <CommonButton
            text="End reward distribution"
            isLoading={isLoading}
            onClick={() => handleStart(false)}
          />
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 7:</Text>
          <CommonButton
            text="Unlock"
            isLoading={isLoading}
            onClick={() => handleLock(false)}
          />
        </Flex>
      </Flex>
    </SectionContainer>
  );
};

export default ClaimRewardManager;
