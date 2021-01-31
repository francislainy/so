const path = require('path')

const url = "http://localhost"
const port = 8991
const Pact = require('@pact-foundation/pact').Pact;

const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: "FRONTEND",
    provider: "BACKEND",
    pactfileWriteMode: "merge",
})

// Setup the provider
before(() => provider.setup())

// Write Pact when all tests done
after(() => provider.finalize())

// verify with Pact, and reset expectations
afterEach(() => provider.verify())

module.exports = {
    provider,
    url,
    port
}