const contract = {
  testnet: {
    CONTRACT_ADDRESS: "5E4wVPskHczwUtnJTa7Vy6PNh1e7HLBJ82he7YbJjNXhR1qA",
  },
  mainnet: {
    CONTRACT_ADDRESS: "5E4wVPskHczwUtnJTa7Vy6PNh1e7HLBJ82he7YbJjNXhR1qA",
  },
};

const treasury_pool_contract = contract[process.env.REACT_APP_ENV];
export default treasury_pool_contract;
