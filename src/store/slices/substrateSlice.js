import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
import {
  execContractQuerybyMetadata,
  execContractQuerybyMetadataConvertResult,
  getAzeroBalanceOfAddress,
} from "utils/contracts";
import betaz_core_contract from "utils/contracts/betaz_core";
import betaz_token_contract from "utils/contracts/betaz_token";
import sale_pool_contract from "utils/contracts/sale_pool";
import staking_pool_contract from "utils/contracts/staking_pool";
import treasury_pool_contract from "utils/contracts/treasury_pool";
import pandora_pool_contract from "utils/contracts/pandora_pool";
import { BN } from "@polkadot/util";
import { formatPoolBalance } from "utils";

const localCurrentAccount = window?.localStorage?.getItem(
  "localCurrentAccount"
);

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  api: null,
  allAccounts: [],
  currentAccount: JSON.parse(localCurrentAccount) || null,
  adapter: null,
  poolBalance: {
    core: 0,
    staking: 0,
    treasury: 0,
  },
  betRates: {
    overRates: [
      0, 0, 0, 0, 103, 104, 105, 107, 108, 109, 110, 111, 113, 114, 115, 117,
      118, 120, 121, 123, 124, 126, 127, 129, 131, 133, 134, 136, 138, 140, 142,
      144, 147, 149, 151, 153, 156, 158, 161, 164, 166, 169, 172, 175, 179, 182,
      185, 189, 193, 197, 201, 205, 209, 214, 218, 223, 229, 234, 240, 246, 252,
      259, 266, 273, 281, 289, 298, 307, 317, 328, 339, 351, 364, 378, 394, 410,
      428, 447, 469, 492, 518, 547, 579, 615, 656, 703, 757, 820, 895, 985,
      1094, 1231, 1407, 1641, 1970, 2462, 3283, 4925, 9850, 0,
    ],
    underRates: [
      0, 9850, 4925, 3283, 2462, 1970, 1641, 1407, 1231, 1094, 985, 895, 820,
      757, 703, 656, 615, 579, 547, 518, 492, 469, 447, 428, 410, 394, 378, 364,
      351, 339, 328, 317, 307, 298, 289, 281, 273, 266, 259, 252, 246, 240, 234,
      229, 223, 218, 214, 209, 205, 201, 197, 193, 189, 185, 182, 179, 175, 172,
      169, 166, 164, 161, 158, 156, 153, 151, 149, 147, 144, 142, 140, 138, 136,
      134, 133, 131, 129, 127, 126, 124, 123, 121, 120, 118, 117, 115, 114, 113,
      111, 110, 109, 108, 107, 105, 104, 103, 0, 0, 0, 0,
    ],
  },
  betRollNumbers: {
    numberOverRollMin: 4,
    numberOverRollMax: 98,
    numberUnerRollMin: 1,
    numberUnerRollMax: 95,
  },
  buyStatus: {
    endTime: 0,
    status: true,
  },
};

export const substrateSlice = createSlice({
  name: "substrate",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },

    setCurrentApi: (state, action) => {
      state.api = action.payload;
    },

    disconnectCurrentAccount: (state) => {
      state.currentAccount = null;
    },

    updateAccountsList: (state, action) => {
      state.allAccounts = action.payload;
    },

    updateAdapter: (state, action) => {
      state.adapter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserBalance.fulfilled, (state, action) => {
      state.currentAccount = {
        ...state.currentAccount,
        balance: action.payload,
      };
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.poolBalance = action.payload;
    });
    builder.addCase(fetchRollNumbers.fulfilled, (state, action) => {
      state.betRollNumbers = action.payload;
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.betRates = action.payload;
    });
    builder.addCase(fetchBuyStatus.fulfilled, (state, action) => {
      state.buyStatus = action.payload;
    });
  },
});

export const {
  setCurrentApi,
  setCurrentAccount,
  updateAccountsList,
  disconnectCurrentAccount,
  updateAdapter,
} = substrateSlice.actions;

export default substrateSlice.reducer;

export const fetchUserBalance = createAsyncThunk(
  "substrate/fetchUserBalance",
  async ({ currentAccount }) => {
    const [
      tokenBalance,
      azeroBalance,
      stakeAmount,
      totalStake,
      stakingBalance,
    ] = await Promise.all([
      execContractQuerybyMetadata(
        currentAccount?.address,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "psp22::balanceOf",
        currentAccount?.address
      ),
      getAzeroBalanceOfAddress({
        address: currentAccount?.address,
      }),
      execContractQuerybyMetadata(
        currentAccount?.address,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getStakeAmountByAccount",
        currentAccount?.address
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        staking_pool_contract.CONTRACT_ABI,
        staking_pool_contract.CONTRACT_ADDRESS,
        0,
        "stakingPoolTrait::getTotalStaked"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getStakingPoolAmount"
      ),
    ]);

    const betaz = formatPoolBalance(tokenBalance);
    const azero = formatNumDynDecimal(azeroBalance);
    const stake = formatPoolBalance(stakeAmount);
    let reward = 0;
    let total_stake = totalStake?.toHuman()?.Ok?.replaceAll(",", "") / 10 ** 12;
    if (total_stake > 0) {
      reward =
        ((
          new BN(stakingBalance?.toHuman()?.Ok?.replaceAll(",", ""))
            .mul(new BN(stakeAmount?.toHuman()?.Ok?.replaceAll(",", "")))
            .div(new BN(totalStake?.toHuman()?.Ok?.replaceAll(",", "")))
            .toString() /
          10 ** 12
        ).toFixed(4) *
          10000) /
        10000;
    }

    return { betaz, azero, stake, reward };
  }
);

export const fetchBalance = createAsyncThunk(
  "substrate/fetchBalance",
  async () => {
    // TODO: check can fix warning about storing api on redux?

    const [
      corePoolBalance,
      stakingPoolBalance,
      treasuryPoolBalance,
      pandoraPoolBalance,
      rewardPoolBalance,
    ] = await Promise.all([
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getCorePoolAmout"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getStakingPoolAmount"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getTreasuryPoolAmount"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getPandoraPoolAmount"
      ),
      execContractQuerybyMetadata(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getRewardPoolAmount"
      ),
    ]);

    const core = formatPoolBalance(corePoolBalance);
    const staking = formatPoolBalance(stakingPoolBalance);
    const treasury = formatPoolBalance(treasuryPoolBalance);
    const pandora = formatPoolBalance(pandoraPoolBalance);
    const reward = formatPoolBalance(rewardPoolBalance);

    return { core, staking, treasury, pandora, reward };
  }
);

export const fetchRates = createAsyncThunk("substrate/fetchRates", async () => {
  const [over, under] = await Promise.all([
    execContractQuerybyMetadataConvertResult(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getOverRates"
    ),
    execContractQuerybyMetadataConvertResult(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getUnderRates"
    ),
  ]);

  let overRates = over.map((element) => element.toNumber());
  let underRates = under.map((element) => element.toNumber());

  return {
    overRates,
    underRates,
  };
});

export const fetchRollNumbers = createAsyncThunk(
  "substrate/fetchRollNumbers",
  async () => {
    let [
      numberOverRollMin,
      numberOverRollMax,
      numberUnerRollMin,
      numberUnerRollMax,
    ] = await Promise.all([
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMinNumberOverRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMaxNumberOverRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMinNumberUnderRoll"
      ),
      execContractQuerybyMetadataConvertResult(
        defaultCaller,
        betaz_core_contract.CONTRACT_ABI,
        betaz_core_contract.CONTRACT_ADDRESS,
        0,
        "betA0CoreTrait::getMaxNumberUnderRoll"
      ),
    ]);

    numberOverRollMin = parseInt(numberOverRollMin);
    numberOverRollMax = parseInt(numberOverRollMax);
    numberUnerRollMin = parseInt(numberUnerRollMin);
    numberUnerRollMax = parseInt(numberUnerRollMax);
    return {
      numberOverRollMin,
      numberOverRollMax,
      numberUnerRollMin,
      numberUnerRollMax,
    };
  }
);

export const fetchBuyStatus = createAsyncThunk(
  "substrate/fetchBuyStatus",
  async () => {
    // TODO: check can fix warning about storing api on redux?
    const poolInfo = await execContractQuerybyMetadata(
      defaultCaller,
      sale_pool_contract.CONTRACT_ABI,
      sale_pool_contract.CONTRACT_ADDRESS,
      0,
      "salePoolTrait::getPoolSaleInfo",
      "Sale"
    );
    let endTime = poolInfo?.toHuman().Ok?.endTimeBuy;
    let status = poolInfo?.toHuman().Ok?.buyStatus;

    return { endTime, status };
  }
);
