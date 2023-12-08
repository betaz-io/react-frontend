import { Box, Text, Flex, Switch, SimpleGrid, Input } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import CommonButton from "components/button/commonButton";
import { useSelector } from "react-redux";
import { delay } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import staking_pool_contract from "utils/contracts/staking_pool";
import { useWallet } from "contexts/useWallet";
import { isValidAddressPolkadotAddress } from "utils";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;

const SetClaimedStatus = () => {
  const { currentAccount } = useSelector((s) => s.substrate);

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [address, setAddress] = useState("");

  const handleSwitch = async () => {
    if (!isValidAddressPolkadotAddress(address)) {
      toast.error("Invalid address");
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
    
    const toastCheckStart = toast.loading("Step 2: Check reward Started ...");
    const checkStart = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::getRewardStarted"
    );
    toast.dismiss(toastCheckStart);

    if (checkStart?.toHuman().Ok) {
      toast.error("Reward is Start!");
      return;
    }

    const toastCheckclaimed = toast.loading("Step 3: Check is Claimed ...");
    const checkClaimed = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::isClaimed",
      address
    );
    toast.dismiss(toastCheckclaimed);

    if (checkClaimed?.toHuman().Ok === value) {
      toast.error("Invalid Status!");
      return;
    }

    const toastCheckRole = toast.loading("Step 4: Check Role Admin ...");
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
      const toasthandle = toast.loading("Step 5: Seting ...");
      await execContractTx(
        currentAccount,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::setClaimedStatus",
        address,
        value
      );
      await delay(3000);
      toast.dismiss(toasthandle);
      setIsLoading(false);
      setIsClaimed(value);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { checked } = e.target;
    setValue(checked);
  });

  const onChangeAddress = useCallback((e) => {
    const { value } = e.target;
    setAddress(value);
  });

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "50px" }}
    >
      <Text className="deposit-box-title">
        Set claimed status
      </Text>
      <Box className="deposit-box-amount-box" mt="24px">
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
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Text textAlign="center">
            Status: <b>{isClaimed ? "Claimed" : "Can Claim"}</b>
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

export default SetClaimedStatus;
