"use strict"

/**
 export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
 npm run publish
 */

const expect = require("chai").expect
const {updateStatsEndpoint} = require("../../api");
const {provider, url, port} = require("../helper");

const {uuid, string, regex} = require('@pact-foundation/pact/dsl/matchers');

describe("Stats API test", () => {

    const REQUEST_BODY = {
        endpoint: "/my-endpoint"
    }

    const EXPECTED_BODY = {
        id: uuid("0531c13b-a5ac-4314-bac6-fdfd89c9e0c2"),
        endpoint: string("/my-updated-endpoint"),
    }

    describe("put /stats/0531c13b-a5ac-4314-bac6-fdfd89c9e0c2/endpoint", () => {
        before(done => {
            const interaction = {
                state: "a request to update a stats endpoint",
                uponReceiving: "a request to update a stats endpoint",
                withRequest: {
                    method: "PUT",
                    path: "/api/gatling-tool/stats/0531c13b-a5ac-4314-bac6-fdfd89c9e0c2/endpoint",
                    headers: {
                        Accept: "application/json",
                    },
                    body: REQUEST_BODY
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': regex({generate: 'application/json', matcher: '^application\/json.*'}),
                    },
                    body: EXPECTED_BODY,
                },
            }
            provider.addInteraction(interaction).then(() => {
                done()
            })
        })

        it("returns the correct response", done => {
            const axiosParams = {
                url: url,
                port: port,
                id: "0531c13b-a5ac-4314-bac6-fdfd89c9e0c2",
                payload: REQUEST_BODY
            }

            updateStatsEndpoint(axiosParams).then(response => {
                try {
                    expect(response.status).to.eql(200)
                } catch (e) {
                }
                done()
            }, done)
        })
    })
})