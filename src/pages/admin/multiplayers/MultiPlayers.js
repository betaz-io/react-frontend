import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { SectionContainer } from "components/container";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import betaz_core from "utils/contracts/betaz_core_calls";
import dia_random from "utils/contracts/dia_contract_calls";
import { fetchUserBalance, fetchBalance } from "store/slices/substrateSlice";
import { delay } from "utils";
import CommonButton from "components/button/commonButton";
import { getAzeroBalanceOfAddress } from "utils/contracts";

// const IPRequired = ["113.190.44.205"];

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;
const defaultphase = process.env.REACT_APP_DEFAULT_CALLER_PHASE;

const MultiPlayers = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState(0);
  const { currentAccount } = useSelector((s) => s.substrate);

  const loadBalance = async () => {
    dispatch(fetchUserBalance({ currentAccount }));
    dispatch(fetchBalance());
  };

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  const onRoll = async () => {
    let maxBet = await betaz_core.getMaxBet(defaultCaller);
    let your_balance = await getAzeroBalanceOfAddress({
      address: defaultCaller,
    });

    let betAmount;
    if (parseFloat(your_balance) > parseFloat(maxBet)) {
      betAmount = randomNumber(0, parseFloat(maxBet));
    } else {
      betAmount = randomNumber(0, parseFloat(your_balance));
    }
    betAmount = betAmount.toFixed(4);

    let rollOver = Math.random() < 0.5;

    let position;
    if (rollOver) {
      position = Math.floor(randomNumber(4, 98));
      // position = 98;
    } else {
      position = Math.floor(randomNumber(1, 95));
      // position = 1;
    }

    console.log({ betAmount, position, rollOver });

    const bet = await betaz_core.getBet(defaultCaller);
    if (bet) {
      // await random dia
      const toastAwaitrandom = toast.loading("DIA random number ...");
      let numberForRound = false;
      while (!numberForRound) {
        try {
          numberForRound = await dia_random.getRandomNumberForRound(
            defaultCaller,
            bet?.oracleRound?.replaceAll(",", "")
          );
          await delay(1000);
        } catch (err) {
          console.log({ errorGetRandomValueForRound: err });
          toast.dismiss(toastAwaitrandom);
          break;
        }
      }
      toast.dismiss(toastAwaitrandom);

      // finalize
      const toastHandle = toast.loading("Execute finalize ...");
      try {
        let finalized = await betaz_core.MultiFinalize(defaultphase);

        console.log({ finalized });

        if (finalized) {
          console.log(finalized);
          if (finalized.is_win)
            toast(
              <span>
                Win: Congratulations! You won
                <span style={{ color: "#1beca7" }}>
                  {" " + finalized.win_amount + " "}
                </span>
                $AZERO!
              </span>,
              {
                style: {
                  fontSize: "20px",
                },
              }
            );
          else
            toast("Lose: Better luck next time!", {
              style: {
                fontSize: "20px",
              },
            });
          loadBalance();
        }
      } catch (error) {
        console.log({ error });
        toast.error(`${error.response.data.error}`);
        loadBalance();
        toast.dismiss(toastHandle);
        return;
      }
      toast.dismiss(toastHandle);
    }

    if (parseFloat(betAmount) <= parseFloat(maxBet)) {
      let played = await betaz_core.MultiPlay(
        betAmount,
        position,
        rollOver,
        defaultphase
      );

      if (!played) {
        toast.error("Something wrong with your roll");
        loadBalance();
        return;
      }
    } else {
      toast.error("Not enough balance!");
    }

    loadBalance();
    await delay(2000);
    const newBet = await betaz_core.getBet(defaultCaller);

    // await random dia
    const toastAwaitrandom = toast.loading("DIA random number ...");
    let numberForRound = false;
    while (!numberForRound) {
      try {
        numberForRound = await dia_random.getRandomNumberForRound(
          defaultCaller,
          newBet?.oracleRound?.replaceAll(",", "")
        );
        await delay(1000);
      } catch (err) {
        console.log({ errorGetRandomValueForRound: err });
        toast.dismiss(toastAwaitrandom);
        break;
      }
    }
    toast.dismiss(toastAwaitrandom);

    // finalize
    const toastHandle = toast.loading("Execute finalize ...");
    try {
      let finalized = await betaz_core.MultiFinalize(defaultphase);

      console.log({ finalized });

      if (finalized) {
        console.log(finalized);
        if (finalized.is_win)
          toast(
            <span>
              Win: Congratulations! You won
              <span style={{ color: "#1beca7" }}>
                {" " + finalized.win_amount + " "}
              </span>
              $AZERO!
            </span>,
            {
              style: {
                fontSize: "20px",
              },
            }
          );
        else
          toast("Lose: Better luck next time!", {
            style: {
              fontSize: "20px",
            },
          });
        loadBalance();
      }
    } catch (error) {
      console.log({ error });
      toast.error(`${error.response.data.error}`);
      loadBalance();
      toast.dismiss(toastHandle);
      return;
    }
    toast.dismiss(toastHandle);
  };

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

  const test = async () => {
    if (value === "") {
      toast.error("invalid value!");
      return;
    }

    for (let i = 0; i < Number(value); i++) {
      console.log(`Play ${i + 1} start`);
      setIsLoading(true);
      await onRoll();
      console.log(`Play ${i + 1} end`);
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer
      className="deposit-box-container"
      sx={{ marginTop: "50px" }}
    >
      <Text className="deposit-box-title">Multi Player</Text>
      <Box className="deposit-box-amount-box" mt="24px">
        <Text>Amount</Text>
        <Flex className="deposit-box-amount-input">
          <Input
            focusBorderColor="transparent"
            sx={{ border: "0px" }}
            value={value}
            onChange={onChangeValue}
            // type="number"
          />
        </Flex>
      </Box>
      <Flex direction="column" alignItems="center" mt="24px">
        <CommonButton
          text="test"
          isLoading={isLoading}
          onClick={() => test()}
        />
      </Flex>
    </SectionContainer>
  );
};

export default MultiPlayers;
