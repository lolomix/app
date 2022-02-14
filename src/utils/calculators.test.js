const { calculatePerformanceOfCoinPairs } = require("./calculators");

const coinPairs = [
  [
    { close: 353.96, closeTime: 1644701616999 },
    { close: 356.96, closeTime: 1644615216999 },
    { close: 343.96, closeTime: 1644528816999 },
  ],
  [
    { close: 2.9505, closeTime: 1644701616999 },
    { close: 2.9535, closeTime: 1644615216999 },
    { close: 2.6535, closeTime: 1644528816999 },
  ],
  [
    { close: 3573.58, closeTime: 1644701616999 },
    { close: 3590.58, closeTime: 1644615216999 },
    { close: 3422.58, closeTime: 1644528816999 },
  ],
];

describe("calculatePerformanceOfCoinPairs() function", () => {
  it("test function", () => {
    let results = calculatePerformanceOfCoinPairs(coinPairs);
    let expectedPerformances = [
      [0, 0.8475533958639394, -3.641864634692963],
      [0, 0.10167768174886, -10.157440325038085],
      [0, 0.4757134302296297, -4.678909814013335],
    ];

    expect(results.length).toBe(3);

    results.forEach((result, resultIndex) => {
      expect(result.length).toBe(3);
      result.forEach((coinPair, coinPairIndex) => {
        expect(coinPair.performance).toBe(
          expectedPerformances[resultIndex][coinPairIndex]
        );
      });
    });
  });
});
