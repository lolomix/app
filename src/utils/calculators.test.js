const {
  calculatePerformanceOfCoinPairs,
  calculateAggregatedPerformanceOfCoinPairs,
  getRelativePercentageDifferenceBetween,
  getPercentageOfValue,
} = require("./calculators");

describe("calculatePerformanceOfCoinPairs() function", () => {
  let coinPairs;

  beforeEach(() => {
    coinPairs = [
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
  });

  it("should return same length of array", () => {
    let results = calculatePerformanceOfCoinPairs(coinPairs);

    expect(results.length).toBe(coinPairs.length);

    results.forEach((result, resultIndex) => {
      expect(result.length).toBe(coinPairs[resultIndex].length);
    });
  });

  it("should calculate relative performance of coin pairs", () => {
    let results = calculatePerformanceOfCoinPairs(coinPairs);
    let expectedPerformances = [
      [0, 0.8475533958639394, -3.641864634692963],
      [0, 0.10167768174886, -10.157440325038085],
      [0, 0.4757134302296297, -4.678909814013335],
    ];

    results.forEach((result, resultIndex) => {
      result.forEach((coinPair, coinPairIndex) => {
        expect(coinPair.performance).toBeCloseTo(
          expectedPerformances[resultIndex][coinPairIndex]
        );
      });
    });
  });
});

describe("getRelativePercentageDifferenceBetween() function", () => {
  it.each([
    [1, 1, 0],
    [20, 20, 0],
    [20, 30, -33.33333333333333],
    [11, 10, 10],
    [10, 11, -9.090909090909092],
    [0.21311231, 0.566132231, -62.35644283605538],
    [-0.21311231, 0.566132231, -137.64355716394462],
  ])(
    "should calculate relative percentage difference between '%s' and '%s' to be close to '%s'",
    (newValue, referenceValue, differenceInPercentage) => {
      expect(
        getRelativePercentageDifferenceBetween(newValue, referenceValue)
      ).toBeCloseTo(differenceInPercentage);
    }
  );
});

describe("calculateAggregatedPerformanceOfCoinPairs() function", () => {
  let coinPairPerformances;

  beforeEach(() => {
    coinPairPerformances = [
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
  });

  it.each([
    [[], []],
    [[], [12, 34, 34]],
    [
      [[{ performance: 0 }], [{ performance: 0 }]],
      [12, 34, 34],
    ],
    [
      [[{ performance: 0 }], [{ performance: 0 }], []],
      [12, 34, 34],
    ],
  ])(
    "should return empty for invalid parameters of '%s' and '%s'",
    (ticksOfCoinPairs, percentages) => {
      let results = calculateAggregatedPerformanceOfCoinPairs(
        ticksOfCoinPairs,
        percentages
      );

      expect(results).toBeArrayOfSize(0);
    }
  );

  it("should return empty for invalid parameters", () => {
    let results = calculateAggregatedPerformanceOfCoinPairs([], [25, 25]);

    expect(results).toBeArrayOfSize(0);
  });

  it("should return same length of array", () => {
    let results = calculateAggregatedPerformanceOfCoinPairs(
      coinPairPerformances,
      [25, 25, 50]
    );

    expect(results.length).toBe(coinPairPerformances.length);
  });

  it("should calculate proportionately aggregated performance of coin pairs", () => {
    let results = calculateAggregatedPerformanceOfCoinPairs(
      coinPairPerformances,
      [10, 50, 40]
    );
    let expectedAggregatedPerformance = [
      0, 0.3258795525526758, -7.314470551593672,
    ];

    results.forEach((result, resultIndex) => {
      expect(result).toBeCloseTo(expectedAggregatedPerformance[resultIndex]);
    });
  });
});

describe("getPercentageOf() function", () => {
  it.each([
    [50, 50, 25],
    [10, 10, 1],
    [5, 100, 5],
    [5, 1000, 50],
    [100, 5, 5],
    [0.0005, 1000, 0.005],
    [50, -45, -22.5],
    [-0.56, 0.0034, -0.00001904],
  ])(
    "should calculate '%s' percent of '%s' to be close to '%s'",
    (value, percentage, differenceInPercentage) => {
      expect(getPercentageOfValue(percentage, value)).toBeCloseTo(
        differenceInPercentage
      );
    }
  );
});
