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
  pandoraHistoryData: [],
  totalPages: 0,
  currentPage: 1,
  currentTab: 0,
  status: "",
};

export const pandoraHistorySlice = createSlice({
  name: "pandoraHistory",
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
    builder.addCase(fetchPandoraBetData.fulfilled, (state, action) => {
      state.pandoraHistoryData = action.payload.data;
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
} = pandoraHistorySlice.actions;

export default pandoraHistorySlice.reducer;

export const fetchPandoraBetData = createAsyncThunk(
  "pandoraHistory/fetchPandoraBetData",
  async (currentAccount, { getState }) => {
    const { currentPage, currentTab } = getState().pandoraHistory;

    let [data, total] = await Promise.all([
      clientAPI("post", "/getPandoraBetHistory", {
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
      clientAPITotalPages("post", "/getPandoraBetHistory", {
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
    ]);

    return { data: data, total: Math.ceil(total / 10) };
  }
);