const { truncate, formatCurrency, formatRecipe } = require("./formatters");
const { BigNumber } = require("ethers");

describe("formatCurrency() formatter", () => {
  it.each([
    ["en-GB", 2000, "2,000"],
    ["en-GB", 2.555555555, "2.56"],
    ["en-GB", 2.55, "2.55"],
    ["en-GB", 6665656556, "6,665,656,556"],
    ["de-DE", 2000, "2.000"],
    ["de-DE", 2.555555555, "2,56"],
    ["de-DE", 2.55, "2,55"],
    ["de-DE", 6665656556, "6.665.656.556"],
  ])(
    "should format in locales `%s` from `%s` to `%s`",
    (locales, num, expected) => {
      const formatted = formatCurrency(num, locales);

      expect(formatted).toBe(expected);
    }
  );
});

describe("truncate() formatter", () => {
  let sample;

  beforeEach(() => {
    sample = "This is a long sentence.";
  });

  it("should add ellipsis at the end by default", () => {
    const truncated = truncate(sample, 4);

    expect(truncated).toEndWith("...");
  });

  it("should add replacement variable at the end", () => {
    const replacement = "!!!";
    const truncated = truncate(sample, 4, undefined, replacement);

    expect(truncated).toEndWith(replacement);
  });

  it("should truncate middle of the string", () => {
    const truncated = truncate(sample, 4, -4);

    expect(truncated).toEndWith("This...nce.");
  });

  test.each([
    [1, -9, "T...sentence."],
    [4, -2, "This...e."],
    [6, -5, "This i...ence."],
  ])("should truncate after %i and before %i)", (after, before, expected) => {
    const truncated = truncate(sample, after, before);

    expect(truncated).toBe(expected);
  });
});

describe("formatRecipe() formatter", () => {
  test.each(["", undefined, null, NaN, 0])(
    "should return 'undefined' if falsy provided)",
    (item) => {
      const result = formatRecipe(item);

      expect(result).toBe(undefined);
    }
  );

  it("should format 'chefId' from BigNumber", () => {
    const result = formatRecipe({
      chefId: BigNumber.from(3),
    });

    expect(result.chefId).toBe(3);
  });

  it("should format 'name' from Bytes32", () => {
    const result = formatRecipe({
      // Awesome Recipe
      name: "0x417765736f6d6520526563697065000000000000000000000000000000000000",
    });

    expect(result.name).toBe("Awesome Recipe");
  });

  it("should format 'coinPairs' object vaules from BigNumber", () => {
    const result = formatRecipe({
      coinPairs: [
        { id: BigNumber.from(1), percentage: BigNumber.from(25) },
        { id: BigNumber.from(2), percentage: BigNumber.from(25) },
        { id: BigNumber.from(3), percentage: BigNumber.from(50) },
      ],
    });

    expect(result.coinPairs[0].id).toBe(1);
    expect(result.coinPairs[1].id).toBe(2);
    expect(result.coinPairs[2].id).toBe(3);
    expect(result.coinPairs[0].percentage).toBe(25);
    expect(result.coinPairs[1].percentage).toBe(25);
    expect(result.coinPairs[2].percentage).toBe(50);
  });

  it("should format 'stakedAroma' from BigNumber", () => {
    const result = formatRecipe({
      stakedAroma: BigNumber.from(333),
    });

    expect(result.stakedAroma).toBe(333);
  });

  it("should format 'timestamp' from BigNumber", () => {
    const result = formatRecipe({
      timestamp: BigNumber.from(2222222),
    });

    expect(result.timestamp).toBe(2222222);
  });

  // it("should return 'date' if 'timestamp' present", () => {
  //   const result = formatRecipe({
  //     timestamp: BigNumber.from(1644510308),
  //   });
  //
  //   expect(result.date).toBe("10/02/2022, 16:25:08");
  // });

  it("should return 'undefined' if 'timestamp' not present", () => {
    const result = formatRecipe({
      stakedAroma: BigNumber.from(333),
    });

    expect(result.date).toBe(undefined);
  });
});
