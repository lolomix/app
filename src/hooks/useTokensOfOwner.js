import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'

/**
 * @param tokenAbi
 * @param tokenAddress
 * @returns {undefined}
 */
export function useTokensOfOwner(tokenAbi, tokenAddress) {
  const { account, library } = useEthers()
  const [tokens, setTokens] = useState()

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadTokens() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);
        const tokens = await contract.methods.tokensOfOwner(account).call({ from: account });

        setTokens(tokens)

      } catch (e) {
        console.log(e);
      }
    }
    loadTokens();

  }, [account, library, tokenAbi, tokenAddress])

  return tokens
}

