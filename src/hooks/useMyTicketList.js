import { useQuery } from "react-query";
import { APICall } from "api/client";
import pandora_psp34_contract from "utils/contracts/pandora_psp34";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const queryKeys = { myTicketList: "myTicketList" };

async function fetchCollectionList(ownerAddress, currentPage) {
  try {
    const options = {
      collection_address: pandora_psp34_contract.CONTRACT_ADDRESS,
      owner: ownerAddress,
      limit: 6,
      offset: 6 * (currentPage - 1),
    };

    let { ret: dataList } = await APICall.getNFTsByOwnerAndCollection(options);
    const data = dataList?.filter((item) => item.owner === ownerAddress);
    const result = data.map((item) => {
      return { player: item?.owner, nftId: item?.tokenID };
    });
    return result;
  } catch (error) {
    console.log("error", error);

    return [];
  }
}

export function useMyTicketList(ownerAddress) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading, isRefetching } = useQuery(
    [queryKeys.myTicketList, ownerAddress, currentPage],
    () => fetchCollectionList(ownerAddress, currentPage),
    { refetchOnWindowFocus: false }
  );

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    myTicketList: data,
    refetch,
    isLoading,
    isRefetching,
    prevPage,
    nextPage,
    currentPage,
  };
}
