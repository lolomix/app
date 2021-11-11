import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { convertToDesiredIpfsURL, isValidURL } from '../utils/url'

/**
 * @param uri
 * @returns {Promise<*>}
 */
async function fetchMetadataByTokenURI (uri) {
  uri = convertToDesiredIpfsURL(uri)

  if (! isValidURL(uri)) {
    return {};
  }

  const response = await fetch(uri);

  if (response.status !== 200) {
    return {};
  }

  return response.json();
}

/**
 * @param tokenAbi
 * @param tokenAddress
 * @param tokenID
 * @returns {undefined}
 */
export function useNFTWithMetadata(tokenAbi, tokenAddress, tokenID) {
  const { account, library } = useWeb3React()
  const [NFT, setNFT] = useState()

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadNFT() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);

        let tokenURI = await contract.methods.tokenURI(180).call({ from: account })


        // todo: remove hard coded ipfs link
        if (! isValidURL(tokenURI)) {
          tokenURI = `ipfs://QmQ89bTT7P9KqNWQw3n9f8zrA4xmDKGpFDZYJvoVex8ZsN/${tokenID}`;
        }

        let metadata = await fetchMetadataByTokenURI(tokenURI)

        // todo: remove hard coded ipfs link
        metadata.image = `ipfs://QmaPevfa3tugsoGdGYwPYaH8FYBDiJoVrDaDKe2er8Vi8L/${tokenID}.png`

        if (metadata.image) {
          metadata.image = convertToDesiredIpfsURL(metadata.image)
        } else {
          metadata.image = "https://placehold.it/600x600"
        }

        setNFT({
          tokenID: tokenID,
          tokenURI: tokenURI,
          metadata: metadata
        })

      } catch (e) {
        console.log(e);
      }
    }
    loadNFT();

  }, [account, library, tokenAbi, tokenID, tokenAddress])

  return NFT
}

