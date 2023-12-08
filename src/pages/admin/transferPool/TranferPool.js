import { Box, Text, Input, Flex, Select } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import {
  formatQueryResultToNumber,
  delay,
  convertBalanceToNumber,
} from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import betaz_core_contract from "utils/contracts/betaz_core";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import staking_pool_contract from "utils/contracts/staking_pool";
import treasury_pool_contract from "utils/contracts/treasury_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const options = [
  { value: "staking", label: "Staking pool", color: "#0d171b" },
  { value: "treasury", label: "Treasury pool", color: "#0d171b" },
  { value: "pandora", label: "Pandora pool", color: "#0d171b" },
];

const TransferPool = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, SetSelected] = useState("");
  const handleUpdate = async () => {
    if (selected === "") {
      toast.error("You have not selected a pool!");
      return;
    }

    if (value === 0 || value === "") {
      toast.error("Invalid value!");
      return;
    }

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

      if (selected === "staking") {
        let amount = await execContractQuery(
          defaultCaller,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::getStakingPoolAmount"
        );
        if (convertBalanceToNumber(amount) <= 0) {
          toast.error("Not enough balance!");
          setIsLoading(false);
          return;
        }
        toast.success(`transfer azero to ${selected} Pool ...`);
        await execContractTx(
          currentAccount,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::transferStakingPool"
        );
      } else if (selected === "treasury") {
        let amount = await execContractQuery(
          defaultCaller,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::getTreasuryPoolAmount"
        );
        if (convertBalanceToNumber(amount) <= 0) {
          toast.error("Not enough balance!");
          setIsLoading(false);
          return;
        }
        toast.success(`transfer azero to ${selected} Pool ...`);
        await execContractTx(
          currentAccount,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::transferTreasuryPool"
        );
      } else if (selected === "pandora") {
        let amount = await execContractQuery(
          defaultCaller,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::getPandoraPoolAmount"
        );
        if (convertBalanceToNumber(amount) <= 0) {
          toast.error("Not enough balance!");
          setIsLoading(false);
          return;
        }
        toast.success(`transfer azero to ${selected} Pool ...`);
        await execContractTx(
          currentAccount,
          betaz_core_contract.CONTRACT_ABI,
          betaz_core_contract.CONTRACT_ADDRESS,
          0,
          "betA0CoreTrait::transferPandoraPool"
        );
      }

      setIsLoading(false);
    }

    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
    getAmount();
  };

  const getAmount = async () => {
    let [staking_amount, treasury_amount, pandora_amount] = await Promise.all([
      execContractQuery(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getStakingPoolAmount"
      ),
      execContractQuery(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getTreasuryPoolAmount"
      ),
      execContractQuery(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getPandoraPoolAmount"
      ),
    ]);
    if (selected === "staking") {
      setValue(formatQueryResultToNumber(staking_amount));
    } else if (selected === "treasury") {
      setValue(formatQueryResultToNumber(treasury_amount));
    } else if (selected === "pandora") {
      setValue(formatQueryResultToNumber(pandora_amount));
    }
  };
  const onChangeSelected = useCallback((e) => {
    const { value } = e.target;
    console.log({ value });
    SetSelected(value);
  });

  useEffect(() => {
    getAmount();
  }, [selected]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Transfer to Pool</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Select pool</Text>
        <Flex className="deposit-box-amount-input">
          <Select
            placeholder="Select option"
            background="#0d171b"
            onChange={onChangeSelected}
            value={selected}
          >
            {options.map((item) => {
              return (
                <option
                  style={{
                    color: `${item.color}`,
                  }}
                  value={item.value}
                >
                  {item.label}
                </option>
              );
            })}
          </Select>
        </Flex>
      </Box>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={value}
            type="number"
            isDisabled
          />
          <Flex
            w="100px"
            alignItems="center"
            gap={1}
            pl="4px"
            borderLeft="2px solid rgba(255, 255, 255, 0.4)"
          >
            <AppIcon size="18px" />
            BetAZ
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Transfer to Pool"
          isLoading={isLoading}
          onClick={() => handleUpdate()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default TransferPool;
