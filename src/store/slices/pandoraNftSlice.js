import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { clientAPITotalPages } from "api/client";
import { clientAPI } from "api/client";
import { execContractQuery } from "utils/contracts";
import { execContractQuerybyMetadata } from "utils/contracts";
import pandora_pool_contract from "utils/contracts/pandora_pool";

// import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
// import { execContractQuerybyMetadata } from "utils/contracts";
// import pandora_pool_contract from "utils/contracts/pandora_pool";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  sessionId: 0,
  holdAmount: 0,
  totalPlayers: 0,
  sessionInfo: null,
  nftsData: [],
  totalPages: 0,
  currentPage: 1,
  currentTab: 0,
  status: "",
};

export const pandoraNftSlice = createSlice({
  name: "pandoraNft",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },

    incrementCurrentPage: (state) => {
      state.currentPage++;
    },

    decrementCurrentPage: (state) => {
      state.currentPage--;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPandoraSession.fulfilled, (state, action) => {
      state.sessionId = action.payload.sessionId;
    });
    builder.addCase(fetchPandoraHoldAmountByPlayer.fulfilled, (state, action) => {
      state.holdAmount = action.payload.holdAmount;
    });
    builder.addCase(fetchTotalPlayer.fulfilled, (state, action) => {
      state.totalPlayers = action.payload.totalPlayers;
    });
  },
});

export const {
  setStatus,
  clearStatus,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentTab,
  setCurrentPage,
} = pandoraNftSlice.actions;

export default pandoraNftSlice.reducer;

export const fetchPandoraSession = createAsyncThunk(
  "substrate/fetchPandoraSession",
  async () => {
    const id = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getLastSessionId"
    );

    let sessionId = id?.toHuman().Ok;
    return { sessionId };
  }
);

export const fetchPandoraHoldAmountByPlayer = createAsyncThunk(
  "substrate/fetchPandoraHoldAmountByPlayer",
  async (currentAccount) => {
    const amount = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::getHoldAmountPlayers",
      currentAccount?.address
    );

    let holdAmount = Number(amount?.toHuman().Ok?.replaceAll(",", "") / 10 ** 12);
    return { holdAmount };
  }
);

export const fetchTotalPlayer = createAsyncThunk(
  "substrate/fetchTotalPlayer",
  async (sessionId) => {
    const total = await execContractQuery(
      defaultCaller,
      pandora_pool_contract.CONTRACT_ABI,
      pandora_pool_contract.CONTRACT_ADDRESS,
      0,
      "pandoraPoolTraits::totalPlayersInSession",
      sessionId
    );

    let totalPlayers = Number(total?.toHuman().Ok);
    return { totalPlayers };
  }
);