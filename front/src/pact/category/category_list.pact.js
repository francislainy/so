"use strict"

const expect = require("chai").expect
const {retrieveCategories} = require("../../api");
const {eachLike, uuid, string, regex} = require('@pact-foundation/pact/dsl/matchers');
const {provider, url, port} = require("../helper");

describe("Category API test", () => {

    const EXPECTED_BODY =
        {
            categories: eachLike(
                {
                    id: uuid("29bccad9-c27f-46d3-83cf-51c8bfe405bb"),
                    title: string("My 29 category"),
                }
            )
        }

    describe("get /category", () => {
        before(done => {
            const interaction = {
                state: "a request for all categories",
                uponReceiving: "a request for all categories",
                withRequest: {
                    method: "GET",
                    path: "/api/gatling-tool/category",
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
            retrieveCategories(axiosParams).then(response => {
                expect(response.status).to.eql(200)
                done()
            }, done)
        })
    })
})