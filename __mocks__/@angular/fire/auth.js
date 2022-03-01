"use strict";

const rxjs = require("rxjs");

const mock = jest.createMockFromModule("@angular/fire/auth");
mock.authState = jest.fn().mockReturnValue(rxjs.of(null));

module.exports = mock;
