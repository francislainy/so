"use strict"

const expect = require("chai").expect
const {updateReport} = require("../../api");
const {uuid, string, integer, regex} = require('@pact-foundation/pact/dsl/matchers');
const {provider, url, port} = require("../helper");

describe("Report API test", () => {

    const REQUEST_BODY = {
        id: "87f2ebeb-880e-4541-bcf1-d317067b9e6b",
        title: "my title",
        runDate: 1591609820902,
        createdDate: 1604024543390,
        category: {"id": "9a820664-e2c4-4048-9060-c0c9ac2198ba"}
    }

    const EXPECTED_BODY = {
        id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
        title: string("My report"),
        runDate: integer(1591609820902),
        createdDate: integer(1591609820902),
        category: {
            id: uuid("9a820664-e2c4-4048-9060-c0c9ac2198ba"),
            title: string("My title"),
        }
    }

    describe("put /report/87f2ebeb-880e-4541-bcf1-d317067b9e6b", () => {
        before(done => {
            const interaction = {
                state: "a request to update a report",
                uponReceiving: "a request to update a report",
                withRequest: {
                    method: "PUT",
                    path: "/api/gatling-tool/report/87f2ebeb-880e-4541-bcf1-d317067b9e6b",
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
                id: REQUEST_BODY.id,
                payload: REQUEST_BODY,
            }
            updateReport(axiosParams).then(response => {
                expect(response.status).to.eql(200)
                done()
            }, done)
        })
    })
})