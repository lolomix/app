import { IPFS_GATEWAY } from '../web3/constants'
import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/browser';

/**
 * If the provided string contains an IPFS CID then convert to desired Gateway URL
 *
 * @param string
 * @returns string
 */
export function convertToDesiredIpfsURL(string) {
  const ipfsGatewayTools = new IPFSGatewayTools()
  const { containsCid } = ipfsGatewayTools.containsCID(string)

  if (containsCid) {
    string = ipfsGatewayTools.convertToDesiredGateway(string, IPFS_GATEWAY)
  }

  return string
}

/**
 * Determine if string is a valid URL
 *
 * @param string
 * @returns {boolean|*}
 */
export function isValidURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false
  }

  return url;
}