import { useQuery } from "react-query";
import { APICall } from "api/client";
import pandora_psp34_contract from "utils/contracts/pandora_psp34";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clientAPI } from "api/client";
import { clientAPITotalPages } from "api/client";

const queryKeys = { myTicketList: "pandoraBetHistory" };

async function fetchPandoraBetHistory(currentPage) {
  try {
    const options = {
      limit: 10,
      offset: 10 * (currentPage - 1),
      sort: -1,
    };

    let [data, total] = await Promise.all([
      clientAPI("post", "/getPandoraBetHistory", options),
      clientAPITotalPages("post", "/getPandoraBetHistory", options),
    ]);

    const totalpages = Math.ceil(total / 10);
    return { data, totalpages };
  } catch (error) {
    console.log("error", error);

    return { data: [], total: 0 };
  }
}

export function usePandoraBetHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [queryKeys.pandoraBetHistory, currentPage],
    () => fetchPandoraBetHistory(currentPage),
    { refetchOnWindowFocus: false }
  );

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    pandoraHistoryData: data?.data,
    totalPages: data?.totalpages,
    refetch,
    isLoading,
    isRefetching,
    prevPage,
    nextPage,
    setCurrentPage,
    currentPage,
  };
}
