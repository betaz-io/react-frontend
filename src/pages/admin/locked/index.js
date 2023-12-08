import {
  Box,
  Text,
  Flex,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";
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

const Locked = () => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const { api } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const getIslocked = async () => {
    const result = await execContractQuery(
      currentAccount?.address,
      staking_pool_contract.CONTRACT_ABI,
      staking_pool_contract.CONTRACT_ADDRESS,
      0,
      "stakingPoolTrait::getIsLocked"
    );

    const lock = result?.toHuman().Ok;
    setIsLocked(lock);
    setValue(lock);
  };

  const handleSwitch = async () => {
    if (value === isLocked) {
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
        value
      );
      await delay(3000);
      setIsLoading(false);
      setIsLocked(value);
    }
  };

  const onChangeValue = useCallback((e) => {
    const { checked } = e.target;
    setValue(checked);
  });

  useEffect(() => {
    if (api && currentAccount?.address) getIslocked();
  }, [currentAccount, api]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Update is locked</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Text textAlign="center">
            Status: <b>{isLocked ? "Locked" : "Not lock"}</b>
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

export default Locked;
