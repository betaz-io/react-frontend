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
    builder.addCase(fetchNftsData.fulfilled, (state, action) => {
      state.nftsData = action.payload.data;
      state.totalPages = action.payload.total;
    });
    builder.addCase(fetchPandoraSession.fulfilled, (state, action) => {
      state.sessionId = action.payload.sessionId;
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

export const fetchNftsData = createAsyncThunk(
  "pandoraNft/fetchNftsData",
  async (currentAccount, { getState }) => {
    const { currentPage, currentTab } = getState().pandoraNft;

    let [data, total] = await Promise.all([
      clientAPI("post", "/getNftByCaller", {
        caller: currentAccount?.address,
        limit: 6,
        offset: 6 * (currentPage - 1),
      }),
      clientAPITotalPages("post", "/getNftByCaller", {
        caller: currentAccount?.address,
        limit: 6,
        offset: 6 * (currentPage - 1),
      }),
    ]);

    if (currentAccount === "") {
      let data = [];
      return { data, total: 0 };
    } else {
      return { data: data, total: Math.ceil(total / 6) };
    }
  }
);

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
    if (sessionId) {
      
    }
    return { sessionId };
  }
);