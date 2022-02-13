import { useChefSeasonSupply } from "./useChefSeasonSupply";
import { useChefTotalSupply } from "./useChefTotalSupply";
import { useEffect, useState } from "react";

/**
 * Returns the remaining amount of CHEFs for sale in the Season.
 *
 * @returns {undefined|number}
 */
export function useChefSeasonRemaining() {
  const [totalSupply] = useChefTotalSupply();
  const [seasonSupply] = useChefSeasonSupply();
  const [seasonRemaining, setSeasonRemaining] = useState();

  useEffect(() => {
    setSeasonRemaining(seasonSupply?.sub(totalSupply)?.toNumber());
  }, [seasonSupply, totalSupply]);

  return seasonRemaining;
}
