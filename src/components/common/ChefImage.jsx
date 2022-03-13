import placeholder300 from "../../assets/components/common/chef-image/placeholder-300.png";
import placeholder600 from "../../assets/components/common/chef-image/placeholder-600.png";
import placeholder1000 from "../../assets/components/common/chef-image/placeholder-1000.png";
import placeholder1500 from "../../assets/components/common/chef-image/placeholder-1500.png";
import placeholder3000 from "../../assets/components/common/chef-image/placeholder-3000.png";
import { useChefMetadata } from "../../hooks/chef/useChefMetadata";
import { theme } from "../../utils/theme";
import { useState } from "react";
import { Box } from "@mui/material";

/**
 * @param {int|undefined} tokenId
 * @param {object|undefined} imgProps
 * @param {object|undefined} sourceProps
 * @param {object|undefined} pictureProps
 * @param {object|undefined} wrapperProps
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
  wrapperProps
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
    <Box {...wrapperProps}>
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
            tokenId
              ? `CHEF NFT #${tokenId} image`
              : "CHEF NFT placeholder image"
          }
          onError={() => setError(true)}
          {...imgProps}
        />
      </picture>
    </Box>
  );
}

/**
 * @param {int|undefined} tokenId
 * @param {object|undefined} imgProps
 * @param {object|undefined} sourceProps
 * @param {object|undefined} pictureProps
 * @param {object|undefined} wrapperProps
 * @returns {JSX.Element}
 * @constructor
 */
export function ChefImageById({
  tokenId,
  imgProps,
  sourceProps,
  pictureProps,
  wrapperProps
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
      wrapperProps={wrapperProps}
    />
  );
}
