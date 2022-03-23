import { withTranslation } from "react-i18next";
import { Grid, Link } from "@mui/material";
import NftCard from "../../components/web3/NftCard";
import NoNftNotificationCard from "../../components/common/NoNftNotificationCard";
import { useChefIdsOfOwner } from "../../hooks/chef/useChefIdsOfOwner";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import Layout from "../../components/layout/Layout";
import NftBuy from "../../components/web3/NftBuy";
import { Link as RouterLink } from "react-router-dom";
import { useChefSeasonRemaining } from "../../hooks/chef/useChefSeasonRemaining";
import { useConfig } from "@usedapp/core";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function MyChefs() {
  const {
    readOnlyChainSettings: { masterContractAddress: tokenAddress },
  } = useConfig();
  const nfts = useChefIdsOfOwner();
  const remaining = useChefSeasonRemaining();

  return (
    <Layout
      helmetTitle="My Chefs"
      title="My Chefs"
      subTitle={`You Own : ${nfts ? nfts.length : 0}`}
      icon={<MyChefsIcon sx={{ fontSize: 55 }} />}
      buttonType="back"
    >
      <Grid container item gap={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={2.5}>
          <NftBuy remaining={remaining !== 0} />
        </Grid>
        {nfts ? (
          nfts.map((tokenID, index) => (
            <Grid key={tokenID.toString()} item xs={12} sm={6} md={5} lg={2.5}>
              <Link
                rel="noreferrer nofollow"
                to={`/my-chefs/chef/${tokenID}`}
                component={RouterLink}
                style={{ textDecoration: "none" }}
              >
                <NftCard
                  tokenAbi={tokenAbi}
                  tokenAddress={tokenAddress}
                  tokenID={tokenID.toNumber()}
                  lazyLoad={index > 2}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <Grid item md={6}>
            <NoNftNotificationCard fullHeight />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default withTranslation()(MyChefs);
