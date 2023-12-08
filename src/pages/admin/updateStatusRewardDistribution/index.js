import { Box, Text, Flex, Switch, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import CommonButton from "components/button/commonButton";
import { useSelector } from "react-redux";
import { delay } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import { useWallet } from "contexts/useWallet";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;

const UpdateStatusRewardDistribution = () => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const { api } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const getIsStartReward = async () => {
    const result = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::getRewardStarted"
    );

    const lock = result?.toHuman().Ok;
    setIsStart(lock);
    setValue(lock);
  };

  const handleSwitch = async () => {
    if (value === isStart) {
      toast.error("Invalid status!");
      return;
    }

    const toastCheckLock = toast.loading("Step 1: Check reward locked ...");
    const checkLock = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::getIsLocked"
    );
    toast.dismiss(toastCheckLock);

    if (!checkLock?.toHuman().Ok) {
      toast.error("Reward is locked!");
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
        value
      );
      await delay(3000);
      toast.dismiss(toasthandle);
      setIsLoading(false);
      setIsStart(value);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { checked } = e.target;
    setValue(checked);
  });

  useEffect(() => {
    if (api && currentAccount?.address) {
      getIsStartReward();
    }
  }, [currentAccount, api]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "50px" }}
    >
      <Text className="deposit-box-title">
        Update status reward distribution
      </Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Text textAlign="center">
            Status: <b>{isStart ? "Start reward" : "End reward"}</b>
          </Text>
          <Flex justifyContent="center" alignItems="center">
            <Switch
              id="isChecked"
              colorScheme="teal"
              size="lg"
              isDisabled={isLoading}
              isChecked={value}
              onChange={onChangeValue}
            />
          </Flex>
        </SimpleGrid>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Change status"
          isLoading={isLoading}
          onClick={() => handleSwitch()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default UpdateStatusRewardDistribution;
