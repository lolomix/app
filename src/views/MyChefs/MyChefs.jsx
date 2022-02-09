import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Grid } from "@mui/material";
// custom
import { useEthers } from "@usedapp/core";
import NftCard from "../../components/web3/NftCard";
import NoNftNotificationCard from "../../components/common/NoNftNotificationCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import { useChefofOwner } from "../../hooks/useChefofOwner";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import Layout from "../../components/layout/Layout";
import NftBuy from "../../components/web3/NftBuy";
/**
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo refactor and get rid of if hell in jsx
 */
function MyChefs() {
  const { active, error } = useEthers();

  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const nfts = useChefofOwner();

  return (
    <Layout
      helmetTitle="My Chefs"
      title="My Chefs"
      subTitle={`You Own : ${nfts ? nfts.length : 0}`}
      icon={<MyChefsIcon sx={{ fontSize: 70, paddingBottom: 2 }} />}
    >
      <Grid container item gap={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={2.5}>
          <NftBuy />
        </Grid>
        {active ? (
          nfts ? (
            nfts.map((tokenID, index) => (
              <Grid
                key={tokenID.toString()}
                item
                xs={12}
                sm={6}
                md={5}
                lg={2.5}
              >
                <a
                  target="_blank"
                  rel="noreferrer nofollow"
                  href={`${NETWORKS[TARGET_CHAIN].openSeaLink}/${
                    NETWORKS[TARGET_CHAIN].contractMaster
                  }/${tokenID.toString()}`}
                  style={{ textDecoration: "none" }}
                >
                  <NftCard
                    tokenAbi={tokenAbi}
                    tokenAddress={tokenAddress}
                    tokenID={tokenID.toNumber()}
                    lazyLoad={index > 2}
                  />
                </a>
              </Grid>
            ))
          ) : (
            <Grid item md={6} mb={21}>
              <NoNftNotificationCard />
            </Grid>
          )
        ) : (
          <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
            <ConnectionErrorCard error={error} elevation={3} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default withTranslation()(MyChefs);
