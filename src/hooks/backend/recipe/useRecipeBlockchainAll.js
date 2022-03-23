import { useQuery } from "react-query";
import { useConfig } from "@usedapp/core";

/**
 * @param {string} rewardsApiUrl
 * @returns {Promise<any>}
 */
const getRecipeBlockchainAll = async (rewardsApiUrl) => {
  const response = await fetch(`${rewardsApiUrl}/blockchain/recipe/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/*
 * @returns {UseQueryResult<*, unknown>}
 */
export default function useRecipeBlockchainAll() {
  const {
    readOnlyChainSettings: { rewardsApiUrl },
  } = useConfig();

  return useQuery(
    ["getRecipeBlockchainAll"],
    () => getRecipeBlockchainAll(rewardsApiUrl),
    {
      enabled: !!rewardsApiUrl,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
