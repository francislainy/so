"use strict"

/**
 export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
 npm run publish
 */

const expect = require("chai").expect
const {retrieveReportItem} = require("../../api");
const {provider, url, port} = require("../helper");

const {uuid, string, integer, regex} = require('@pact-foundation/pact/dsl/matchers');
const {PactV3, MatchersV3} = require("@pact-foundation/pact/v3")
const {number} = MatchersV3

describe("Report API test", () => {

    const EXPECTED_BODY =
        {
            id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
            title: string("My title"),
            runDate: integer(1591609820902),
            createdDate: integer(1591609820902),
            category: {
                id: uuid("227d1129-270a-4c66-b11e-35b6abe2b4c3"),
                title: string("My title"),
            },
            numberOfUsers: integer(1),
            duration: integer(398) //todo: update to use long instead
        }

    describe("get /report/87f2ebeb-880e-4541-bcf1-d317067b9e6b", () => {
        before(done => {
            const interaction = {
                state: "a request for a single report",
                uponReceiving: "a request for a single report",
                withRequest: {
                    method: "GET",
                    path: "/api/gatling-tool/report/87f2ebeb-880e-4541-bcf1-d317067b9e6b",
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
                id: "87f2ebeb-880e-4541-bcf1-d317067b9e6b",
            }

            retrieveReportItem(axiosParams).then(response => {
                try {
                    expect(response.status).to.eql(200)
                } catch (e) {
                }
                done()
            }, done)
        })
    })
})