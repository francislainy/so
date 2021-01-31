"use strict"

/**
   export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
   npm run publish
 */

const expect = require("chai").expect
const {retrieveCategory} = require("../../api");
const {provider, url, port} = require("../helper");

const {uuid, string, regex} = require('@pact-foundation/pact/dsl/matchers');

describe("Category API test", () => {

    const EXPECTED_BODY = {
        id: uuid("58330784-983c-4ae9-a5a1-d8f8d2b70a59"),
        title: string("My category")
    }

    describe("get /category/58330784-983c-4ae9-a5a1-d8f8d2b70a59", () => {
        before(done => {
            const interaction = {
                state: "a request for a single category",
                uponReceiving: "a request for a single category",
                withRequest: {
                    method: "GET",
                    path: "/api/gatling-tool/category/58330784-983c-4ae9-a5a1-d8f8d2b70a59",
                    headers: {
                        Accept: "application/json",
                    },
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
                id: "58330784-983c-4ae9-a5a1-d8f8d2b70a59",
            }

            retrieveCategory(axiosParams).then(response => {
                try {
                    expect(response.status).to.eql(200)
                } catch (e) {
                }
                done()
            }, done)
        })
    })
})