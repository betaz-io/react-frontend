import { Box, Text, Flex, Switch, SimpleGrid, Input } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import { delay } from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import betaz_core_contract from "utils/contracts/betaz_core";
import { useWallet } from "contexts/useWallet";
import { clientAPI } from "api/client";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const PandoraPoolManager = () => {
  const dispatch = useDispatch();
  const { currentAccount, poolBalance } = useSelector((s) => s.substrate);
  const { api } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [value, setValue] = useState(0);

  const getState = async () => {
    const locked = await execContractQuery(
      currentAccount?.address,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getIsLocked"
    );

    const lock = locked?.toHuman().Ok;
    setIsLocked(lock);
  };

  const handleLock = async (state) => {
    if (state === isLocked) {
      toast.error("Invalid status!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
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
        pandora_pool_contract.CONTRACT_ABI,
        pandora_pool_contract.CONTRACT_ADDRESS,
        0,
        "pandoraPoolTraits::updateIsLocked",
        state
      );
      await delay(3000);
      setIsLocked(state);
      setIsLoading(false);
    }
  };

  const handleTranfer = async () => {
    if (value === 0 || value === "") {
      toast.error("Invalid value!");
      return;
    }

    const pandoraPoolAmount = await execContractQuery(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getPandoraPoolAmount"
    );

    // if (pandoraPoolAmount.toHuman()?.Ok?.replaceAll(",", "") / 10 ** 12 == 0) {
    //   toast.error("Not enough balance!");
    //   return;
    // }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
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
      const toasthandle = toast.loading("Tranfer Pandora pool ...");
      await execContractTx(
        currentAccount,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "transferAndUpdateSessionPandoraPool",
        value
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

  const onChangeValue = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setValue(value);
      }
    }
  });

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Pandora pool management</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <SimpleGrid columns={2}>
          <Flex align="center" justify="center" gap="12px">
            <Text textAlign="center">
              Reward status: <b>{isLocked ? "Locked" : "Not locked"}</b>
            </Text>
          </Flex>

          <Flex align="center" justify="center" gap="12px">
            <CommonButton
              text={isLocked ? "Un Lock" : "Lock"}
              isLoading={isLoading}
              onClick={() => handleLock(!isLocked)}
            />
          </Flex>
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
          <Flex align="center" gap="12px">
            <Text textAlign="center">Step 1:</Text>
            <Box className="deposit-box-amount-box" mt="24px">
              <Text>Session Id</Text>
              <Flex className="deposit-box-amount-input">
                <Input
                  focusBorderColor="transparent"
                  sx={{ border: "0px" }}
                  value={value}
                  onChange={onChangeValue}
                  // type="number"
                />
              </Flex>
              <CommonButton
                mt="24px"
                text="Transfer pandora pool"
                isLoading={isLoading}
                onClick={() => handleTranfer()}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex align="center" gap="12px">
          <Text textAlign="center">Step 2:</Text>
          <Text textAlign="center">
            Await cron job pandora pool at 6:30 AM on sunday
          </Text>
        </Flex>
      </Flex>
    </SectionContainer>
  );
};

export default PandoraPoolManager;
