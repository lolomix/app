const {
  calculatePerformanceOfCoinPairs,
  calculateAggregatedPerformanceOfCoinPairs,
} = require("./calculators");

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

const coinPairPerformances = [
  [
    { performance: 0 },
    { performance: 0.8475533958639394 },
    { performance: -3.641864634692963 },
  ],
  [
    { performance: 0 },
    { performance: 0.10167768174886 },
    { performance: -10.157440325038085 },
  ],
  [
    { performance: 0 },
    { performance: 0.4757134302296297 },
    { performance: -4.678909814013335 },
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

describe("calculateAggregatedPerformanceOfCoinPairs() function", () => {
  it("test function", () => {
    let results = calculateAggregatedPerformanceOfCoinPairs(
      coinPairPerformances,
      [10, 50, 40]
    );
    let expectedAggregatedPerformance = [
      0, 0.3258795525526758, -7.314470551593672,
    ];
    expect(results.length).toBe(3);

    results.forEach((result, resultIndex) => {
      expect(result).toEqual(expectedAggregatedPerformance[resultIndex]);
    });
  });
});
