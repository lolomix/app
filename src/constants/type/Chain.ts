import { ChainMeta } from "./ChainMeta";
import { Chain as BaseChain} from "@usedapp/core";

export type Chain = BaseChain & ChainMeta;
