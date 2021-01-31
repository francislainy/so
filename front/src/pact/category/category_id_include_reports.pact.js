"use strict"

/**
 *  export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
 *  npm run publish
 */

const expect = require("chai").expect
const {getMeCategoryIncludeReports} = require("../../api");
const {uuid, string, eachLike, integer, regex} = require('@pact-foundation/pact/dsl/matchers');
const {provider, url, port} = require("../helper");

describe("Category API test", () => {

    const EXPECTED_BODY = {
        category: {
            id: uuid("58330784-983c-4ae9-a5a1-d8f8d2b70a59"),
            title: string("My category"),
            reports: eachLike({
                id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
                title: string("My report"),
                runDate: integer(1591609820902), //todo: timestamp - 28/10/2020
                createdDate: integer(1591609820902)
            })
        }
    }

    describe("get /category/58330784-983c-4ae9-a5a1-d8f8d2b70a59/include-reports", () => {
        before(done => {
            const interaction = {
                state: "a request for a single category including its children reports",
                uponReceiving: "a request for a single category including its children reports",
                withRequest: {
                    method: "GET",
                    path: "/api/gatling-tool/category/58330784-983c-4ae9-a5a1-d8f8d2b70a59/include-reports",
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
                id: "58330784-983c-4ae9-a5a1-d8f8d2b70a59"
            }

            getMeCategoryIncludeReports(axiosParams).then(response => {
                try {
                    expect(response.status).to.eql(200)
                } catch (e) {
                }
                done()
            }, done)
        })
    })
})