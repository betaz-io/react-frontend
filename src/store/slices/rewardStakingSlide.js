import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "api/client";

const initialState = {
  rewardData: [],
  currentPage: 1,
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

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRewardStaking.fulfilled, (state, action) => {
      state.rewardData = action.payload;
    });
  },
});

export const {
  setStatus,
  clearStatus,
  incrementCurrentPage,
  decrementCurrentPage,
} = rewardStakingSlice.actions;

export default rewardStakingSlice.reducer;

export const fetchRewardStaking = createAsyncThunk(
  "rewardStaking/fetchRewardStaking",
  async (currentAccount, { getState }) => {
    const { currentPage } = getState().rewardStaking;

    let data = await clientAPI("post", "/getRewardByCaller", {
      caller: currentAccount?.address,
      limit: 10,
      offset: 10 * (currentPage - 1),
    });

    return data;
  }
);
