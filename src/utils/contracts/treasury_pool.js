const contract = {
  testnet: {
    CONTRACT_ADDRESS: "5GRWjcT6YGA8Mj7YxX2Ky9R7NBVp9q7fxsiLNDktqSo9DCxN",
  },
  mainnet: {
    CONTRACT_ADDRESS: "5E4wVPskHczwUtnJTa7Vy6PNh1e7HLBJ82he7YbJjNXhR1qA",
  },
};

const treasury_pool_contract = contract[process.env.REACT_APP_ENV];
export default treasury_pool_contract;
