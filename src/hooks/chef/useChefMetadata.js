import { convertToDesiredIpfsURL, isValidURL } from "../../utils/url";
import useChefTokenURIMetadata from "./useChefTokenURIMetadata";
import { useChefTokenURI } from "./useChefTokenURI";

/**
 * @param {int|undefined} tokenId
 * @returns {{metadata: object, tokenId: int|undefined, tokenURI: string|undefined}|undefined}
 */
export function useChefMetadata(tokenId) {
  const tokenURI = useChefTokenURI(tokenId);
  const url = tokenURI && convertToDesiredIpfsURL(tokenURI);
  const { data } = useChefTokenURIMetadata(url);

  return {
    tokenId,
    tokenURI,
    metadata: {
      ...data,
      ...(data?.image &&
        isValidURL(data.image) && {
          image: convertToDesiredIpfsURL(data.image),
        }),
    },
  };
}
