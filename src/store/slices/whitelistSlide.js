import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "api/client";

// import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
// import { execContractQuerybyMetadata } from "utils/contracts";
// import staking_pool_contract from "utils/contracts/staking_pool";

// const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const initialState = {
  currentPage: 1,
  currentTab: 0,
  whitelistData: [],
  buyerData: {
    poolType: "",
    buyer: "",
    amount: 0,
    price: 0,
  },
  status: "",
};

export const whitelistSlice = createSlice({
  name: "whitelist",
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

    setWhitelist: (state, action) => {
      state.whitelistData = action.payload;
    },

    clearWhitelist: (state) => {
      state.whitelistData = null;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    clearStatus: (state) => {
      state.status = "";
    },

    setBuyerData: (state, action) => {
      state.buyerData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWhitelist.fulfilled, (state, action) => {
      state.whitelistData = action.payload;
    });
  },
});

export const {
  clearWhitelist,
  setWhitelist,
  setStatus,
  clearStatus,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentTab,
  setBuyerData
} = whitelistSlice.actions;

export default whitelistSlice.reducer;

export const fetchWhitelist = createAsyncThunk(
  "whitelist/fetchWhitelist",
  async (poolType, { getState }) => {
    const { currentPage, currentTab } = getState().whitelist;

    let data = await clientAPI("post", "/getWhitelist", {
      poolType: poolType,
      limit: 10,
      offset: 10 * (currentPage - 1),
    });
    const addAction = (item) => {
      const action = {};
      action.poolType = poolType;
      action.buyer = item?.buyer;
      action.amount = item?.amount;
      action.price = item?.price;
      item.action = action;
    };
    data.forEach(addAction);
    let newData = data.map(({ index, ...rest }) => rest);

    if (poolType === "") {
      let data = [];
      return data;
    }

    return newData;
  }
);
