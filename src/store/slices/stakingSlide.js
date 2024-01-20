import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { clientAPITotalPages } from "api/client";
import { clientAPI } from "api/client";

// import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
// import { execContractQuerybyMetadata } from "utils/contracts";
// import staking_pool_contract from "utils/contracts/staking_pool";

// const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  dataPending: [],
  totalPages: 0,
  currentPage: 1,
  currentTab: 0,
  dataCancelRequestUnstake: [],
  dataUnstake: [],
  status: "",
};

export const stakingSlice = createSlice({
  name: "staking",
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

    setDataCancelRequestUnstake: (state, action) => {
      state.dataCancelRequestUnstake = action.payload;
    },

    clearDataCancelRequestUnstake: (state, action) => {
      state.dataCancelRequestUnstake = action.payload;
    },

    setDataUnstake: (state) => {
      state.dataUnstake = null;
    },

    clearDataUnstake: (state) => {
      state.dataUnstake = null;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPendingUnstake.fulfilled, (state, action) => {
      state.dataPending = action.payload.data;
      state.totalPages = action.payload.total;
    });
  },
});

export const {
  setDataCancelRequestUnstake,
  setDataUnstake,
  setStatus,
  clearDataCancelRequestUnstake,
  clearDataUnstake,
  clearStatus,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentTab,
  setCurrentPage,
} = stakingSlice.actions;

export default stakingSlice.reducer;

export const fetchPendingUnstake = createAsyncThunk(
  "staking/fetchPendingUnstake",
  async (currentAccount, { getState }) => {
    const { currentPage, currentTab } = getState().staking;

    let [data, total] = await Promise.all([
      clientAPI("post", "/getPendingUnstake", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
        status: currentTab,
      }),
      clientAPITotalPages("post", "/getPendingUnstake", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
        status: currentTab,
      }),
    ]);
    const addActionTime = (item) => {
      const action = {};
      action.index = item?.index;
      action.caller = item?.caller;
      action.amount = item?.amount;
      action.time = item?.time;
      item.action = action;
    };
    data.forEach(addActionTime);
    let newData = data.map(({ index, ...rest }) => rest);

    if (currentTab === 3) {
      let [historyData, historyTotal] = await Promise.all([
        clientAPI("post", "/getHistoryStaking", {
          caller: currentAccount?.address,
          limit: 10,
          offset: 10 * (currentPage - 1),
          status: currentTab,
        }),
        clientAPITotalPages("post", "/getHistoryStaking", {
          caller: currentAccount?.address,
          limit: 10,
          offset: 10 * (currentPage - 1),
          status: currentTab,
        }),
      ]);
      newData = historyData;
      total = historyTotal;
    }

    if (currentAccount === "") {
      let data = [];
      return { data, total: 0 };
    } else {
      return { data: newData, total: Math.ceil(total / 10) };
    }
  }
);
