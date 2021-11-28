const { truncate } = require('./formatters')

describe('truncate() formatter', () => {
  let sample

  beforeEach(() => {
    sample = 'This is a long sentence.'
  })

  it('should add ellipsis at the end by default', () => {
    const truncated = truncate(sample, 4)

    expect(truncated).toEndWith('...')
  });

  it('should add replacement variable at the end', () => {
    const replacement = '!!!'
    const truncated = truncate(sample, 4, undefined, replacement)

    expect(truncated).toEndWith(replacement);
  });

  it('should truncate middle of the string', () => {
    const truncated = truncate(sample, 4, -4)

    expect(truncated).toEndWith('This...nce.');
  });

  test.each([
    [1, -9, 'T...sentence.'],
    [4, -2, 'This...e.'],
    [6, -5, 'This i...ence.'],
  ])('should truncate after %i and before %i)', (after, before, expected) => {
    const truncated = truncate(sample, after, before)

    expect(truncated).toBe(expected);
  });

})