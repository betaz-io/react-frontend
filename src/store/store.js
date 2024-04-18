import { combineReducers, configureStore } from "@reduxjs/toolkit";

import substrateReducer from "./slices/substrateSlice";
import stakingReducer from "./slices/stakingSlide";
import whitelistReducer from "./slices/whitelistSlide";
import rewardStakingReducer from "./slices/rewardStakingSlide";
import pandoraNftReducer from "./slices/pandoraNftSlice";
import pandoraBetHistoryReducer from "./slices/pandoraYourBetHistorySlice"

const rootReducer = combineReducers({
  substrate: substrateReducer,
  staking: stakingReducer,
  whitelist: whitelistReducer,
  rewardStaking: rewardStakingReducer,
  pandoraNft: pandoraNftReducer,
  pandoraBetHistory: pandoraBetHistoryReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
