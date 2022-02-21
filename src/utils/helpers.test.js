const {
  coinPairImplode,
  coinPairExplode,
  getLastSundayAt,
} = require("./helpers");
const { format } = require("date-fns");

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
    [["BTC", undefined], undefined],
    [["BTC", NaN], undefined],
    [["BTC", ""], undefined],
    [["BTC", 0], undefined],
    [[undefined, "BTC"], undefined],
    [[NaN, "BTC"], undefined],
    [["", "BTC"], undefined],
    [[0, "BTC"], undefined],
  ])("should explode '%s' to '%s')", (coinPairChunks, expected) => {
    const result = coinPairImplode(coinPairChunks);

    expect(result).toEqual(expected);
  });
});

describe("getLastSundayAt() helper", () => {
  test.each([
    ["2022-02-21T21:00:00", "2022-02-20T21:00:00", 21],
    ["2022-02-21T00:00:00", "2022-02-20T21:00:00", 21],
    ["2022-02-21T01:24:51", "2022-02-20T21:00:00", 21],
    ["2022-02-20T01:24:51", "2022-02-13T21:00:00", 21],
    ["2022-02-20T20:59:59", "2022-02-13T21:00:00", 21],
    ["2022-02-20T21:00:01", "2022-02-20T21:00:00", 21],
    ["2022-02-27T21:00:01", "2022-02-27T21:00:00", 21],
    ["2022-02-27T21:00:01", "2022-02-27T21:00:00", 21],
    ["2022-02-27T01:00:01", "2022-02-27T01:00:00", 1],
    ["2022-02-27T00:59:59", "2022-02-20T01:00:00", 1],
  ])(
    "should get last Sunday for '%s' is '%s')",
    (timeString, expected, hours) => {
      const result = getLastSundayAt(hours, new Date(timeString));

      expect(format(result, "yyyy-MM-dd'T'HH:mm:ss")).toEqual(expected);
    }
  );

  it("should work without date property", () => {
    const result = getLastSundayAt(21);
    expect(result).toBeInstanceOf(Date);
  });

  it("should work without hours property", () => {
    const result = getLastSundayAt();
    expect(result).toBeInstanceOf(Date);
  });
});
