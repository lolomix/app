import { useConfig } from "@usedapp/core";
import { NETWORKS } from "../../../web3/constants";
import { useMutation } from "react-query";

/**
 * @param address
 * @param rewardsApi
 * @returns {Promise<any>}
 */
const getRewardCollectAccumulated = async (address, rewardsApi) => {
  const response = await fetch(`${rewardsApi}/reward/collect`, {
    method: "POST",
    body: `${address}`
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
  const { readOnlyChainId } = useConfig();
  const rewardsApi = NETWORKS[readOnlyChainId].rewardsApi;

  return useMutation((address) =>
    getRewardCollectAccumulated(address, rewardsApi)
  );
}
