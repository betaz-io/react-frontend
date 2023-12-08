import { React, useEffect, useState } from "react";
import AdminPage from "pages/admin";
import { useDispatch, useSelector } from "react-redux";
import { execContractQuery } from "utils/contracts";
import betaz_token_contract from "utils/contracts/betaz_token";
import NotFoundPage from "pages/404/404";

const adminRole = process.env.REACT_APP_ADMIN_ROLE;

const PrivateRouter = () => {
  const { currentAccount } = useSelector((s) => s.substrate);
  const [isAdmin, SetIsAdmin] = useState(false);
  const getAdmin = async () => {
    try {
      let hasRole = await execContractQuery(
        currentAccount?.address,
        betaz_token_contract.CONTRACT_ABI,
        betaz_token_contract.CONTRACT_ADDRESS,
        0,
        "accessControl::hasRole",
        adminRole,
        currentAccount?.address
      );

      SetIsAdmin(hasRole?.toHuman().Ok);
    } catch {
      SetIsAdmin(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [currentAccount]);

  if (isAdmin) {
    return <AdminPage />;
  } else return <NotFoundPage />;
};

export default PrivateRouter;
