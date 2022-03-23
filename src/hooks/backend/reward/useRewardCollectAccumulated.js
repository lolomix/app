import { useConfig } from "@usedapp/core";
import { useMutation } from "react-query";

/**
 * @param {string} address
 * @param {string} rewardsApiUrl
 * @returns {Promise<any>}
 */
const getRewardCollectAccumulated = async (address, rewardsApiUrl) => {
  const response = await fetch(`${rewardsApiUrl}/reward/collect`, {
    method: "POST",
    body: `${address}`,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @returns {UseMutationResult<*, unknown, void, unknown>}
 */
export default function useRewardCollectAccumulated() {
  const {
    readOnlyChainSettings: { rewardsApiUrl },
  } = useConfig();

  return useMutation((address) =>
    getRewardCollectAccumulated(address, rewardsApiUrl)
  );
}
