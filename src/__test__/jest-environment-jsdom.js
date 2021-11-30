// Stolen from https://github.com/facebook/jest/issues/7780#issuecomment-615890410
// and https://github.com/firebase/firebase-js-sdk/issues/3096#issuecomment-827741103
// Overcomes error from jest internals...: https://github.com/facebook/jest/issues/7780
"use strict";

const JSDOMEnvironment = require("jest-environment-jsdom");

class MyEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer
        })
      })
    );
  }

  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder, TextDecoder } = require('util');
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }
  }

  async teardown() {}
}

module.exports = MyEnvironment;