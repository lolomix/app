const { truncate, formatCurrency } = require("./formatters");

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
