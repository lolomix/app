import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { convertToDesiredIpfsURL, isValidURL } from '../utils/url'
import placeholder from '../assets/components/web3/nft-card/placeholder.png'

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

        let tokenURI = await contract.methods.tokenURI(tokenID).call({ from: account })

        // todo: remove this hard coded ipfs link
        if (true || ! isValidURL(tokenURI)) {
          tokenURI = `ipfs://QmXj4xmXe9wHw3GTkCXHs9ihto3hgNhLy9Eh9sFsBEv1Nt/${tokenID}`;
        }

        let metadata = await fetchMetadataByTokenURI(tokenURI)

        if (metadata.image && isValidURL(metadata.image)) {
          metadata.image = convertToDesiredIpfsURL(metadata.image)
        } else {
          metadata.image = placeholder
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

