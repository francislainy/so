"use strict"

const expect = require("chai").expect
const {provider, url, port} = require("../helper");
const {createReport} = require("../../api");
const {uuid, string, integer, regex} = require('@pact-foundation/pact/dsl/matchers');

describe("Report API test", () => {

    const REQUEST_BODY = {
        title: "My title",
        runDate: 1591609820902,
        createdDate: 1591609820902,
        category: {
            "id": "cdb02322-a8a6-4acf-9644-ddf8b24af9e6"
        }
    }

    const EXPECTED_BODY = {
        id: uuid("227d1129-270a-4c66-b11e-35b6abe2b4c3"),
        title: string("My title"),
        runDate: integer(1591609820902),
        createdDate: integer(1591609820902),
        category: {
            id: uuid("227d1129-270a-4c66-b11e-35b6abe2b4c3"),
            title: string("My title"),
        }
    }

    describe("post /report", () => {
        before(done => {
            const interaction = {
                state: "a request to create a report",
                uponReceiving: "a request to create a report",
                withRequest: {
                    method: "POST",
                    path: "/api/gatling-tool/report",
                    headers: {
                        Accept: "application/json",
                    },
                    body: REQUEST_BODY,
                },
                willRespondWith: {
                    status: 201,
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
                payload: REQUEST_BODY
            }

            createReport(axiosParams).then(response => {
                expect(response.status).to.eql(201)
                done()
            }, done)
        })
    })
})