import { useEffect, useState } from 'react'
import { useContractCall } from '@usedapp/core'
import { convertToDesiredIpfsURL, isValidURL } from '../utils/url'
import placeholder from '../assets/components/web3/nft-card/placeholder.png'
import { utils } from 'ethers'

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
 * @param abi
 * @param address
 * @param id
 * @returns {undefined|any}
 */
export function useNFTWithMetadata(abi, address, id) {
  const abiInterface = new utils.Interface(abi)
  const [NFT, setNFT] = useState()

  const [tokenURI] = useContractCall(
    address && {
      abi: abiInterface,
      address: address,
      method: "tokenURI",
      args: [id]
    }
  ) ?? [undefined];

  useEffect(() => {
    async function loadNFTMetadata() {

      if (tokenURI === undefined) return

      let metadata = await fetchMetadataByTokenURI(tokenURI)

      if (metadata.image && isValidURL(metadata.image)) {
        metadata.image = convertToDesiredIpfsURL(metadata.image)
      } else {
        metadata.image = placeholder
      }

      setNFT({
        tokenID: id,
        tokenURI: tokenURI,
        metadata: metadata
      })
    }

    loadNFTMetadata()
  }, [abi, id, address, tokenURI])

  return NFT
}