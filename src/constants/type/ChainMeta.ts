export type ChainMeta = {
    chain: string,
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    }
    rpcUrls: string[];
    blockExplorerUrls: string[];
}
