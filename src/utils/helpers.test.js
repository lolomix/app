const { coinPairImplode, coinPairExplode } = require("./helpers");

describe("coinPairExplode() helper", () => {
  test.each([
    ["BTC/USDT", ["BTC", "USDT"]],
    ["ETC/USD", ["ETC", "USD"]],
    ["USDT/BTC", ["USDT", "BTC"]],
    ["BTC/USDT/ETC", undefined],
    ["BTC-USDT", undefined],
    ["BTC.USDT", undefined],
  ])("should explode '%s' to '%s')", (coinPair, expected) => {
    const result = coinPairExplode(coinPair);

    expect(result).toEqual(expected);
  });
});

describe("coinPairImplode() helper", () => {
  test.each([
    [["BTC", "USDT"], "BTC/USDT"],
    [["ETC", "USD"], "ETC/USD"],
    [["USDT", "BTC"], "USDT/BTC"],
    [["BTC", "USDT", "ETC"], undefined],
    [["BTC"], undefined],
    [[], undefined],
  ])("should explode '%s' to '%s')", (coinPairChunks, expected) => {
    const result = coinPairImplode(coinPairChunks);

    expect(result).toEqual(expected);
  });
});