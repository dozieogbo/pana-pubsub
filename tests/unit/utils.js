"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const utils_1 = require("../../src/utils");
describe('Utils', () => {
    it('validates valid url', () => {
        const result = utils_1.isUrlValid('https://facebook.com');
        chai_1.expect(result).be.true;
    });
    it('fails to valiate invalid url', () => {
        const result = utils_1.isUrlValid('httpsfacebook.com');
        chai_1.expect(result).be.false;
    });
});
