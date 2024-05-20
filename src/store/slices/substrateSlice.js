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
    pandora: 0,
    reward: 0,
  },
  betRates: {
    overRates: [
      // 0, 0, 0, 0, 103, 1035, 104, 106, 107, 108, 109, 110, 112, 113, 114, 116,
      // 117, 119, 120, 122, 123, 125, 126, 128, 130, 132, 133, 135, 137, 139, 141,
      // 143, 146, 148, 150, 152, 155, 157, 160, 163, 165, 168, 171, 174, 178, 181,
      // 184, 188, 192, 196, 200, 204, 208, 213, 217, 222, 228, 233, 239, 245, 251,
      // 258, 265, 272, 280, 288, 297, 306, 316, 327, 338, 350, 363, 377, 394, 409,
      // 427, 446, 468, 491, 517, 546, 578, 614, 655, 702, 756, 819, 894, 984, 994,
      // 1131, 1307, 1541, 1870, 2362, 3183, 4825, 9850, 0,
    ],
    underRates: [
      // 0, 9850, 4825, 3183, 2362, 1870, 1541, 1307, 1131, 994, 984, 894, 819,
      // 756, 702, 655, 614, 578, 546, 517, 491, 468, 446, 427, 409, 394, 377, 363,
      // 350, 338, 327, 316, 306, 297, 288, 280, 272, 265, 258, 251, 245, 239, 233,
      // 228, 222, 217, 213, 208, 204, 200, 196, 192, 188, 184, 181, 178, 174, 171,
      // 168, 165, 163, 160, 157, 155, 152, 150, 148, 146, 143, 141, 139, 137, 135,
      // 133, 132, 130, 128, 126, 125, 123, 122, 120, 119, 117, 116, 114, 113, 112,
      // 110, 109, 108, 107, 106, 104, 1035, 103, 0, 0, 0, 0,
    ],
    percentageRates: 100,
  },
  betRollNumbers: {
    numberOverRollMin: 0,
    numberOverRollMax: 100,
    numberUnerRollMin: 0,
    numberUnerRollMax: 100,
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
      state.poolBalance.core = action.payload.core;
      state.poolBalance.staking = action.payload.staking;
      state.poolBalance.treasury = action.payload.treasury;
      state.poolBalance.pandora = action.payload.pandora;
      state.poolBalance.reward = action.payload.reward;
    });
    builder.addCase(fetchRollNumbers.fulfilled, (state, action) => {
      state.betRollNumbers.numberOverRollMax = action.payload.numberOverRollMax;
      state.betRollNumbers.numberOverRollMin = action.payload.numberOverRollMin;
      state.betRollNumbers.numberUnerRollMax = action.payload.numberUnerRollMax;
      state.betRollNumbers.numberUnerRollMin = action.payload.numberUnerRollMin;
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.betRates.overRates = action.payload.overRates;
      state.betRates.underRates = action.payload.underRates;
      state.betRates.percentageRates = action.payload.percentageRates;
    });
    builder.addCase(fetchBuyStatus.fulfilled, (state, action) => {
      state.buyStatus.endTime = action.payload.endTime;
      state.buyStatus.status = action.payload.status;
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
      reward = formatNumDynDecimal(
        new BN(stakingBalance?.toHuman()?.Ok?.replaceAll(",", ""))
          .mul(new BN(stakeAmount?.toHuman()?.Ok?.replaceAll(",", "")))
          .div(new BN(totalStake?.toHuman()?.Ok?.replaceAll(",", "")))
          .toString() /
          10 ** 12
      );
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
  const [over, under, percentage] = await Promise.all([
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
    execContractQuerybyMetadataConvertResult(
      defaultCaller,
      betaz_core_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "betA0CoreTrait::getPercentageRates"
    ),
  ]);

  let overRates = over.map((element) =>
    parseFloat(element?.replaceAll(",", ""))
  );
  let underRates = under.map((element) =>
    parseFloat(element?.replaceAll(",", ""))
  );

  let percentageRates = parseFloat(percentage?.replaceAll(",", ""));

  return {
    overRates,
    underRates,
    percentageRates,
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
