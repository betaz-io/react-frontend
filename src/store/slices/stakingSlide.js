import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "api/client";

// import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
// import { execContractQuerybyMetadata } from "utils/contracts";
// import staking_pool_contract from "utils/contracts/staking_pool";

// const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  dataPending: [],
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
      state.dataPending = action.payload;
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
} = stakingSlice.actions;

export default stakingSlice.reducer;

export const fetchPendingUnstake = createAsyncThunk(
  "staking/fetchPendingUnstake",
  async (currentAccount, { getState }) => {
    const { currentPage, currentTab } = getState().staking;

    let data = await clientAPI("post", "/getPendingUnstake", {
      caller: currentAccount?.address,
      limit: 10,
      offset: 10 * (currentPage - 1),
    });
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

    if (currentTab === 0) {
      if (currentAccount === "") {
        let data = [];
        return data;
      } else {
        return newData;
      }
    } else if (currentTab === 1) {
      if (currentAccount === "") {
        let data = [];
        return data;
      } else {
        newData = newData.filter((e) => {
          return +new Date() < e.time;
        });
        return newData;
      }
    } else if (currentTab === 2) {
      if (currentAccount === "") {
        let data = [];
        return data;
      } else {
        newData = newData.filter((e) => {
          return +new Date() >= e.time;
        });
        return newData;
      }
    }
  }
);
