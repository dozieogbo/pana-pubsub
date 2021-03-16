import { expect } from "chai";
import { isUrlValid } from "../../utils";

describe('Utils', () => {
    it('validates valid url', () => {
        const result = isUrlValid('https://facebook.com');

        expect(result).be.true;
    });

    it('fails to valiate invalid url', () => {
        const result = isUrlValid('httpsfacebook.com');

        expect(result).be.false;
    });
})