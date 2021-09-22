/*
    Utility functions
*/

export const getNetworkName = () => {
  const network = process.env.REACT_APP_PROVIDER.split(".")[0];
  return network.replace("https://", "");
};

export const setAssemblyToLocalStorage = (address, chain, type, datetime, identifier = 0) => {
  let assemblies = window.localStorage.getItem("assemblies") ? JSON.parse(window.localStorage.getItem("assemblies")) : [];
  let assemblyListed = false;
  assemblies.forEach((item) => {
    if (item.address === address) {
      assemblyListed = true;
    }
  });
  if (!assemblyListed) {
    assemblies.push({
      address: address,
      chain: chain,
      type: type,
      datetime: datetime,
      identifier: identifier,
    });
    window.localStorage.setItem("assemblies", JSON.stringify(assemblies));
  }
};

// see: https://dev.to/onmyway133/how-to-safely-access-deeply-nested-object-in-javascript-3n62
export const getValueNestedObject = (p, d, o) => p.reduce((xs, x) => (xs != null && xs[x] != null ? xs[x] : d), o);

/*
    Big Number

export const b = (a, b) => {
    var ab = new BigNumber(a);
    var bb = new BigNumber(b);
    return ab.times(bb).toString();
};
*/
