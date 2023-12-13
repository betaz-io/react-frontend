import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPITotalPages } from "api/client";
import { clientAPI } from "api/client";

const initialState = {
  rewardData: [],
  currentPage: 1,
  totalPages: 0,
  status: "",
};

export const rewardStakingSlice = createSlice({
  name: "rewardStaking",
  initialState,
  reducers: {
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
    builder.addCase(fetchRewardStaking.fulfilled, (state, action) => {
      state.rewardData = action.payload.data;
      state.totalPages = action.payload.total;
    });
  },
});

export const {
  setStatus,
  clearStatus,
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentPage,
} = rewardStakingSlice.actions;

export default rewardStakingSlice.reducer;

export const fetchRewardStaking = createAsyncThunk(
  "rewardStaking/fetchRewardStaking",
  async (currentAccount, { getState }) => {
    const { currentPage } = getState().rewardStaking;

    let [data, total] = await Promise.all([
      clientAPI("post", "/getRewardByCaller", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
      clientAPITotalPages("post", "/getRewardByCaller", {
        caller: currentAccount?.address,
        limit: 10,
        offset: 10 * (currentPage - 1),
      }),
    ]);

    return {data, total: Math.ceil(total / 10)};
  }
);
