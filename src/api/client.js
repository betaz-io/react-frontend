import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API || "http://localhost:3000/";

export const clientAPI = async (method, url, options) => {
  if (!options) options = {};
  let urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    data: urlencodedOptions,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (method.toLowerCase() === "post") {
    if (data?.status === "OK") return data?.ret;
    else return data?.message;
  } else if (method.toLowerCase() === "get") {
    if (data?.status === "OK") return data?.ret;
    else if (data?.status === "FAILED") return data?.message;
    else return data;
  }
};

export const clientAPITotalPages = async (method, url, options) => {
  if (!options) options = {};
  let urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    data: urlencodedOptions,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (method.toLowerCase() === "post") {
    if (data?.status === "OK") return data?.total;
    else return data?.message;
  } else if (method.toLowerCase() === "get") {
    if (data?.status === "OK") return data?.total;
    else if (data?.status === "FAILED") return data?.message;
    else return data;
  }
};

const client = async (
  method,
  url,
  options = {},
  baseURL = process.env.REACT_APP_API_ARTZERO_URL
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    headers,
    data: urlencodedOptions,
  });

  if (data?.status === "FAILED") {
    console.log("error FAILED @ xx>>", url, data?.message);
  }

  return data;
};

export const APICall = {
  getNFTsByOwnerAndCollection: async ({
    collection_address,
    owner,
    limit = 10000,
    offset = 0,
    sort = -1,
  }) => {
    return await client("POST", "/getNFTsByOwnerAndCollection", {
      collection_address,
      owner,
      limit,
      offset,
      sort,
    });
  },

  askBeUpdateNftData: async (options) => {
    return await client("POST", "/updateNFT", options);
  },
}