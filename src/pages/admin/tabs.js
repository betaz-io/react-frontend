import MinToken from "./mintToken";
import UpdateCorePool from "./updateCorePool";
import UpdateRewardPool from "./updateRewardPool";
import UpdateSalePool from "./updateSalePool";
import TransferPool from "./transferPool/TranferPool";
import WithdrawFee from "./withdrawFee";
import WhitelistManager from "./whitelistManager/WhitelistManager";
import AddSalePool from "./addSalePool";
import ClaimRewardManager from "./claimRewardManager/ClaimRewardManager";
import PandoraPoolManager from "./pandoraPoolManager/PandoraPoolManager";
import MultiPlayers from "./multiplayers/MultiPlayers";
import ContractAddressManager from "./contractAddressManager";
import ContractRolesManager from "./contractRolesMangager";

export const tabItems = (key) => {
  switch (key) {
    case 0:
      return <MinToken />;
    case 1:
      return <UpdateCorePool />;
    case 2:
      return <UpdateRewardPool />;
    case 3:
      return <TransferPool />;
    case 4:
      return <AddSalePool />;
    case 5:
      return <UpdateSalePool />;
    case 6:
      return <WithdrawFee />;
    case 7:
      return <WhitelistManager />;
    case 8:
      return <ClaimRewardManager />;
    case 9:
      return <PandoraPoolManager />;
    case 10:
      return <MultiPlayers />;
    case 11:
      return <ContractAddressManager />;
    case 12:
      return <ContractRolesManager />;
    default:
      return <MinToken />;
  }
};
