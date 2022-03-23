import { Chain as BaseChain} from "@usedapp/core";

export type Chain = BaseChain & {
    chain: string,
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    }
    rpcUrls: string[];
    blockExplorerUrls: string[];
};
