"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("../../src/app"));
const responses_1 = __importDefault(require("../../src/constants/responses"));
chai_1.default.use(chai_http_1.default);
describe('PubSub Endpoints', () => {
    it('should subscribe on valid url', done => {
        const url = 'https://ene5kpboqtlul.x.pipedream.net/';
        chai_1.default
            .request(app_1.default)
            .post('/subscribe/nigeria')
            .send({
            url,
        })
            .end((err, res) => {
            chai_1.expect(res).have.status(200);
            chai_1.expect(res.body).be.an('object');
            chai_1.expect(res.body.url).be.eql(url);
            done();
        });
    });
    it('should not subscribe on invalid url', done => {
        const url = '';
        chai_1.default
            .request(app_1.default)
            .post('/subscribe/nigeria')
            .send({
            url,
        })
            .end((err, res) => {
            chai_1.expect(res).have.status(400);
            chai_1.expect(res.body).be.an('object');
            chai_1.expect(res.body.message).be.eql(responses_1.default.INVALID_SUBSCRIPTION_URL);
            done();
        });
    });
    it('should publish to subscribers', (done) => {
        chai_1.default
            .request(app_1.default)
            .post('/publish/nigeria')
            .send({
            title: 'Test publish',
        })
            .end((err, res) => {
            chai_1.expect(res).have.status(200);
            chai_1.expect(res.body).be.an('object');
            chai_1.expect(res.body.message).be.eql(responses_1.default.PUBLISHED);
            done();
        });
    });
});
