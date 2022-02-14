import { formatCurrency } from "../../utils/formatters";
import { useChefBalanceOf } from "../../hooks/chef/useChefBalanceOf";
import { useEthers } from "@usedapp/core";
import Skeleton from "@mui/material/Skeleton";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function ChefBalance() {
  const { account } = useEthers();
  const balance = useChefBalanceOf(account);

  return balance === undefined ? (
    <Skeleton variant="text" />
  ) : (
    <span>{formatCurrency(balance)}</span>
  );
}

export default ChefBalance;
