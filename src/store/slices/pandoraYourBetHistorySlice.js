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
  sessionInfo: null,
  betHistoryData: [],
  totalPages: 0,
  currentPage: 1,
  currentTab: 0,
  status: "",
};

export const pandoraBetHistorySlice = createSlice({
  name: "pandoraBetHistory",
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
    builder.addCase(fetchPandoraYourBetData.fulfilled, (state, action) => {
      state.betHistoryData = action.payload.data;
      state.totalPages = action.payload.total;
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
} = pandoraBetHistorySlice.actions;

export default pandoraBetHistorySlice.reducer;

export const fetchPandoraYourBetData = createAsyncThunk(
  "pandoraBetHistory/fetchPandoraYourBetData",
  async (currentAccount, { getState }) => {
    const { currentPage, currentTab } = getState().pandoraBetHistory;

    let [data, total] = await Promise.all([
      clientAPI("post", "/getPandoraYourBetHistory", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
      clientAPITotalPages("post", "/getPandoraYourBetHistory", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
    ]);

    if (currentAccount === "") {
      let data = [];
      return { data, total: 0 };
    } else {
      return { data: data, total: Math.ceil(total / 10) };
    }
  }
);