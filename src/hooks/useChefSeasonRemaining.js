import { useChefSeasonSupply } from "./useChefSeasonSupply";
import { useChefTotalSupply } from "./useChefTotalSupply";
import { useEffect, useState } from "react";

/**
 * Returns the remaining amount of CHEFs for sale in the Season.
 *
 * @returns {*[]}
 */
export function useChefSeasonRemaining() {
  const [totalSupply] = useChefTotalSupply();
  const [seasonSupply] = useChefSeasonSupply();
  const [seasonRemaining, setSeasonRemaining] = useState();
  const [seasonRemainingFormatted, setSeasonRemainingFormatted] = useState();

  useEffect(() => {
    setSeasonRemaining(seasonSupply?.sub(totalSupply));
  }, [seasonSupply, totalSupply]);

  useEffect(() => {
    setSeasonRemainingFormatted(seasonRemaining?.toNumber());
  }, [seasonRemaining]);

  return [seasonRemaining, seasonRemainingFormatted];
}
