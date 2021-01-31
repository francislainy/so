"use strict"

const expect = require("chai").expect
const {retrieveReports} = require("../../api");
const {eachLike, uuid, string, integer, regex} = require('@pact-foundation/pact/dsl/matchers');
const {provider, url, port} = require("../helper");

describe("Report API test", () => {

    const EXPECTED_BODY =
        {
            reports: eachLike(
                {
                    id: uuid("afaf0872-2265-409b-abe7-fe8825c8ebab"),
                    title: string("My report category"),
                    runDate: integer(1591609820902),
                    createdDate: integer(1591609820902),
                    category: {
                        id: uuid("227d1129-270a-4c66-b11e-35b6abe2b4c3"),
                        title: string("My title"),
                    }
                }
            )
        }

    describe("get /report", () => {
        before(done => {
            const interaction = {
                state: "a request for all reports",
                uponReceiving: "a request for all reports",
                withRequest: {
                    method: "GET",
                    path: "/api/gatling-tool/report",
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
            }
            retrieveReports(axiosParams).then(response => {
                expect(response.status).to.eql(200)
                done()
            }, done)
        })
    })
})