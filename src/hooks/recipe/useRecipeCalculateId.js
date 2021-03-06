import { useCall, useConfig } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { logUseCall } from "../../utils/loggers";
import { useTranslation } from "react-i18next";

/**
 * @param {array|undefined} tokens
 * @returns {(string|undefined)[]}
 */
export function useRecipeCalculateId(tokens) {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const { t } = useTranslation("contract", { keyPrefix: "exceptions" });

  const call = tokens && {
    contract: new Contract(address, abiInterface),
    method: "calculateRecipeId",
    args: [tokens],
  };

  const result = useCall(call);

  logUseCall(result, call);

  // @todo decouple translation from blockchain hook
  const translatedErrorMessage =
    result?.error?.message && t(result.error.message);

  return [result?.value?.[0], translatedErrorMessage];
}
