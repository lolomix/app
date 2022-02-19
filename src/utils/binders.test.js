const { bindDialogClick, bindDialog } = require("./binders");

describe("bindDialogClick() function", () => {
  let dialogStateMock;
  let bindDialogClickResult;

  beforeEach(() => {
    dialogStateMock = {
      id: "someKindOfId",
      open: true,
      onClose: () => true,
      handleOpen: () => true,
      handleClose: () => true,
      handleToggle: () => true,
    };

    bindDialogClickResult = bindDialogClick(dialogStateMock);
  });

  it("`aria-controls` should match dialog state `id`", () => {
    expect(bindDialogClickResult["aria-controls"]).toBe(dialogStateMock.id);
  });

  it("`aria-haspopup` should be true", () => {
    expect(bindDialogClickResult["aria-haspopup"]).toBe(true);
  });

  it("`onClick` should match dialog state `handleOpen` function", () => {
    expect(bindDialogClickResult.onClick).toBe(dialogStateMock.handleOpen);
  });

  it("`onClick` should be a function", () => {
    expect(bindDialogClickResult.onClick).toBeFunction();
  });

  test.each([
    [undefined, "id"],
    [undefined, "onClick"],
  ])(
    "should return `%s` if `%s` attribute is not defined)",
    (expected, attr) => {
      const bindDialogClickPartialResult = bindDialogClick({});

      expect(bindDialogClickPartialResult[attr]).toBe(expected);
    }
  );
});

describe("bindDialog() function", () => {
  let dialogStateMock;
  let bindDialogResult;

  beforeEach(() => {
    dialogStateMock = {
      id: "someKindOfId",
      open: true,
      onClose: () => true,
      handleOpen: () => true,
      handleClose: () => true,
      handleToggle: () => true,
    };

    bindDialogResult = bindDialog(dialogStateMock);
  });

  it("`id` should match dialog state `id`", () => {
    expect(bindDialogResult.id).toBe(dialogStateMock.id);
  });

  it("`aria-labelledby` should match dialog state `id`", () => {
    expect(bindDialogResult["aria-labelledby"]).toBe(dialogStateMock.id);
  });

  it("`open` should match dialog state `open` function", () => {
    expect(bindDialogResult.open).toBe(dialogStateMock.open);
  });

  it("`onClose` should match dialog state `onClose` function", () => {
    expect(bindDialogResult.onClose).toBe(dialogStateMock.onClose);
  });

  test.each([
    [undefined, "id"],
    [undefined, "aria-labelledby"],
    [undefined, "open"],
    [undefined, "onClose"],
  ])(
    "should return `%s` if `%s` attribute is not defined)",
    (expected, attr) => {
      const bindDialogPartialResult = bindDialogClick({});

      expect(bindDialogPartialResult[attr]).toBe(expected);
    }
  );
});
