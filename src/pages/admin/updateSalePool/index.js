import {
  Box,
  Text,
  Input,
  Flex,
  Select,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { SectionContainer } from "components/container";
import { AppIcon, AzeroIcon } from "components/icons";
import CommonButton from "components/button/commonButton";
import { useDispatch, useSelector } from "react-redux";
import {
  convertToBalance,
  checkBalance,
  delay,
  convertBalanceToNumber,
} from "utils";
import { execContractTx, execContractQuery } from "utils/contracts";
import sale_pool_contract from "utils/contracts/sale_pool";
import { useWallet } from "contexts/useWallet";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import DateTimePicker from "react-datetime-picker";
const adminRole = process.env.REACT_APP_ADMIN_ROLE;
const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const UpdateSalePool = () => {
  const dispatch = useDispatch();
  const { api } = useWallet();
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(false);
  const [selected, SetSelected] = useState("");
  const [endTime, setEndTime] = useState(new Date());

  const handleUpdate = async () => {
    if (selected === "") {
      toast.error("You have not selected a pool!");
      return;
    }

    if (totalAmount === 0 || totalAmount === "") {
      toast.error("Invalid totalAmount!");
      return;
    }

    if (totalPurchaseAmount === "") {
      toast.error("Invalid totalPurchaseAmount!");
      return;
    }

    if (price === "") {
      toast.error("Invalid price!");
      return;
    }

    let hasRole = await execContractQuery(
      currentAccount?.address,
      sale_pool_contract.CONTRACT_ABI,
      sale_pool_contract.CONTRACT_ADDRESS,
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

      let poolInfo = await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getPoolSaleInfo",
        selected
      );

      let poolTotalPurchasedAmount = parseFloat(
        poolInfo?.toHuman()?.Ok?.totalPurchasedAmount.replaceAll(",", "") /
          10 ** 12
      );

      let poolStatus = poolInfo?.toHuman()?.Ok?.buyStatus;

      if (endTime.getTime() < new Date().getTime()) {
        toast.error("Invalid end time!");
        setIsLoading(false);
        return;
      }

      if (poolStatus == status) {
        toast.error("Invalid buy status!");
        setIsLoading(false);
        return;
      }

      if (
        parseFloat(totalPurchaseAmount) < poolTotalPurchasedAmount ||
        parseFloat(totalPurchaseAmount) > totalAmount
      ) {
        toast.error("Invalid totalPurchaseAmount!");
        setIsLoading(false);
        return;
      }

      await execContractTx(
        currentAccount,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::updateSalePoolInfoPoolType",
        selected,
        status,
        endTime?.getTime(),
        convertToBalance(totalAmount),
        convertToBalance(totalPurchaseAmount),
        convertToBalance(price)
      );

      setIsLoading(false);
    }

    await delay(2000);
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const onChangeTotalAmount = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 1;
      else {
        setTotalAmount(value);
      }
    }
  });

  const onChangeTotalPurchaseAmount = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 0;
      else {
        setTotalPurchaseAmount(value);
      }
    }
  });

  const onChangePrice = useCallback((e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    let val = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      val = parseFloat(value);
      if (val < 0) val = 0;
      else {
        setPrice(value);
      }
    }
  });

  const onChangeStatus = useCallback((e) => {
    const { checked } = e.target;
    setStatus(checked);
  });

  const onChangeSelected = useCallback((e) => {
    const { value } = e.target;
    SetSelected(value);
  });

  const getPoolInfor = async () => {
    let pool_infor = (
      await execContractQuery(
        defaultCaller,
        sale_pool_contract.CONTRACT_ABI,
        sale_pool_contract.CONTRACT_ADDRESS,
        0,
        "salePoolTrait::getPoolSaleInfo",
        selected
      )
    )?.toHuman().Ok;

    if (pool_infor) {
      setStatus(pool_infor?.buyStatus);
      // setEndTime(Number(pool_infor?.endTimeBuy?.replaceAll(",", "")));
      setPrice(parseFloat(pool_infor?.price?.replaceAll(",", "")));
      setTotalPurchaseAmount(
        parseFloat(
          pool_infor?.totalPurchasedAmount?.replaceAll(",", "") / 10 ** 12
        )
      );
      setTotalAmount(
        parseFloat(pool_infor?.totalAmount?.replaceAll(",", "") / 10 ** 12)
      );
    } else {
      setStatus(false);
      setPrice(0);
      setTotalPurchaseAmount(0);
      setTotalAmount(0);
      toast.error("Pool not exists");
    }
  };

  useEffect(() => {
    if (selected !== "") {
      getPoolInfor();
    } else {
      setStatus(false);
      setPrice(0);
      setTotalPurchaseAmount(0);
      setTotalAmount(0);
    }
  }, [selected]);

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "100px" }}
    >
      <Text className="deposit-box-title">Update Sale Pool</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Select pool</Text>
        <Flex className="deposit-box-amount-input">
          <Select
            placeholder="Select option"
            background="#0d171b"
            onChange={onChangeSelected}
          >
            <option
              style={{
                color: "#0d171b",
              }}
              value="Sale"
            >
              Sale
            </option>
            <option
              style={{
                color: "#0d171b",
              }}
              value="PrivateInvestment"
            >
              PrivateInvestment
            </option>
            <option
              style={{
                color: "#0d171b",
              }}
              value="AirdropAndMarketing"
            >
              AirdropAndMarketing
            </option>
            <option
              style={{
                color: "#0d171b",
              }}
              value="Team"
            >
              Team
            </option>
            <option
              style={{
                color: "#0d171b",
              }}
              value="Development"
            >
              Development
            </option>
          </Select>
        </Flex>
      </Box>
      <SimpleGrid columns={2} spacing="24px">
        <Box className="deposit-box-amount-box" mt="24px">
          <Text>Buy status</Text>
          <Flex className="deposit-box-amount-input">
            <Flex justifyContent="start" alignItems="center" w="100%">
              <Switch
                id="isChecked"
                colorScheme="teal"
                size="lg"
                isChecked={status}
                onChange={onChangeStatus}
              />
            </Flex>
          </Flex>
        </Box>
        <Box className="deposit-box-amount-box" mt="24px">
          <Text>End time buy</Text>
          <Flex className="deposit-box-amount-input">
            <Flex justifyContent="start" alignItems="center" w="100%">
              <DateTimePicker
                locale="en-EN"
                value={endTime}
                onChange={setEndTime}
              />
            </Flex>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Total amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={totalAmount}
            onChange={onChangeTotalAmount}
            type="number"
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
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Total purchase amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={totalPurchaseAmount}
            onChange={onChangeTotalPurchaseAmount}
            type="number"
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
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>price</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={price}
            onChange={onChangePrice}
            type="number"
          />
          <Flex
            w="100px"
            alignItems="center"
            gap={1}
            pl="4px"
            borderLeft="2px solid rgba(255, 255, 255, 0.4)"
          >
            <AzeroIcon size="15px" />
            AZERO
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="Update Sale Pool"
          isLoading={isLoading}
          onClick={() => handleUpdate()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default UpdateSalePool;
