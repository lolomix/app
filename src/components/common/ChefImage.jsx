import placeholder300 from "../../assets/components/common/chef-image/placeholder-300.png";
import placeholder600 from "../../assets/components/common/chef-image/placeholder-600.png";
import placeholder1000 from "../../assets/components/common/chef-image/placeholder-1000.png";
import placeholder1500 from "../../assets/components/common/chef-image/placeholder-1500.png";
import placeholder3000 from "../../assets/components/common/chef-image/placeholder-3000.png";
import { useChefMetadata } from "../../hooks/chef/useChefMetadata";
import { theme } from "../../utils/theme";
import { useState } from "react";

/**
 * @param {int|undefined} tokenId
 * @param {object|undefined} imgProps
 * @param {object|undefined} sourceProps
 * @param {object|undefined} pictureProps
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo maybe there is a better way of importing the images
 */
export default function ChefImage({
  tokenId,
  imgProps,
  sourceProps,
  pictureProps,
}) {
  const [error, setError] = useState(false);

  /**
   * @type {string[]}
   */
  const defaultSrcSet = [
    `${placeholder300} 300w`,
    `${placeholder600} 600w`,
    `${placeholder1000} 1000w`,
    `${placeholder1500} 1500w`,
    `${placeholder3000} 3000w`,
  ];

  /**
   * @type {string[]}
   */
  const defaultSizes = [
    `(min-width: ${theme.breakpoints.values.md}px) 33vw`,
    `(min-width: ${theme.breakpoints.values.sm}px) 50vw`,
    `100vw`,
  ];

  return (
    <picture {...pictureProps}>
      {!error && sourceProps && <source {...sourceProps} />}
      {/* @todo: add loading="lazy" for images below the fold? how to identify those images? */}
      <img
        style={{
          maxInlineSize: "100%",
          blockSize: "auto",
        }}
        srcSet={defaultSrcSet.join(",")}
        sizes={defaultSizes.join(",")}
        alt={
          tokenId ? `CHEF NFT #${tokenId} image` : "CHEF NFT placeholder image"
        }
        onError={() => setError(true)}
        {...imgProps}
      />
    </picture>
  );
}

/**
 * @param {int|undefined} tokenId
 * @param {object|undefined} imgProps
 * @param {object|undefined} sourceProps
 * @param {object|undefined} pictureProps
 * @returns {JSX.Element}
 * @constructor
 */
export function ChefImageFromId({
  tokenId,
  imgProps,
  sourceProps,
  pictureProps,
}) {
  const { metadata } = useChefMetadata(tokenId);
  return (
    <ChefImage
      tokenId
      imgProps={imgProps}
      sourceProps={{
        ...sourceProps,
        ...(metadata?.image && { srcSet: metadata.image }),
      }}
      pictureProps={pictureProps}
    />
  );
}
