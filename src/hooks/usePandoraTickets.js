import { useQuery } from "react-query";
import { APICall } from "api/client";
import pandora_psp34_contract from "utils/contracts/pandora_psp34";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { clientAPITotalPages } from "api/client";

const queryKeys = { myTicketList: "pandoraTickets" };

async function fetchPandoraTickets(currentAccount, currentPage, currentTab) {
  try {
    const options = {
      caller: currentAccount?.address,
      limit: 20,
      offset: 20 * (currentPage - 1),
      sort: -1,
    };

    let data = [],
      total = 0;
    if (currentTab === 0) {
      let [newData, newTotal] = await Promise.all([
        clientAPI("post", "/getNftByCaller", options),
        clientAPITotalPages("post", "/getNftByCaller", options),
      ]);

      data = [...newData];
      total = newTotal;
    } else if (currentTab === 1) {
      options.isUsed = true;
      let [newData, newTotal] = await Promise.all([
        clientAPI("post", "/getNftUsedByCaller", options),
        clientAPITotalPages("post", "/getNftUsedByCaller", options),
      ]);

      data = [...newData];
      total = newTotal;
    } else if (currentTab === 2) {
      options.isUsed = false;
      let [newData, newTotal] = await Promise.all([
        clientAPI("post", "/getNftUsedByCaller", options),
        clientAPITotalPages("post", "/getNftUsedByCaller", options),
      ]);

      data = [...newData];
      total = newTotal;
    }
    const totalpages = Math.ceil(total / 20);
    return { data, totalpages };
  } catch (error) {
    console.log("error", error);

    return { data: [], total: 0 };
  }
}

export function usePandoraTickets(currentAccount) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [queryKeys.pandoraTickets, currentAccount, currentPage, currentTab],
    () => fetchPandoraTickets(currentAccount, currentPage, currentTab),
    { refetchOnWindowFocus: false }
  );

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    pandoraTicketsData: data?.data,
    totalPages: data?.totalpages,
    refetch,
    isLoading,
    isRefetching,
    prevPage,
    nextPage,
    setCurrentPage,
    currentPage,
    setCurrentTab,
    currentTab
  };
}
