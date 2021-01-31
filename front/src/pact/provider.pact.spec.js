const {Verifier} = require('@pact-foundation/pact');
const path = require('path');
// Setup provider server to verify
const app = require('express')();
const server = app.listen("8082");

const opts = {
    provider: 'BACKEND',
    providerBaseUrl: 'http://localhost:8081',
    // pactBrokerUrl: 'https://fcampos.pactflow.io',
    // pactBrokerToken: 'jBQLotqEIjcrzr8ybO_tBw',
    pactUrls: [
        path.resolve(__dirname, '../../pacts/frontend-backend.json')
    ],
    // publishVerificationResult: true,
    providerVersion: '1.0.0',
    logLevel: 'DEBUG',
};

describe("Pact Verification", () => {
    test("a request for all categories", () => {
        return new Verifier(opts).verifyProvider().finally(() => {
            server.close();
        });
    })
});