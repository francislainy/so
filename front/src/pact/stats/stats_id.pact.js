// "use strict"
//
// /**
//  export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
//  npm run publish
//  */
//
// const expect = require("chai").expect
// const {retrieveReportItem} = require("../../api");
// const {provider, url, port} = require("../helper");
//
// const {uuid, string, integer, regex, decimal} = require('@pact-foundation/pact/dsl/matchers');
//
// describe("Stats API test", () => {
//
//     const EXPECTED_BODY =
//         {
//             id: uuid("e31b41e3-e677-4840-a590-c059eb6ca9d9"),
//             reportId: uuid("86255ceb-b925-451f-9f4d-f8a6e64681a1"),
//             name: string("Global Information"),
//             numberOfRequests: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             minResponseTime: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             maxResponseTime: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             meanResponseTime: {
//                 total: decimal(8043),
//                 ok: decimal(8043),
//                 ko: decimal(0)
//             },
//             standardDeviation: { //todo: double?
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             percentiles1: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             percentiles2: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             percentiles3: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             percentiles4: {
//                 total: integer(8043),
//                 ok: integer(8043),
//                 ko: integer(0)
//             },
//             group1: {
//                 name: string("t < 800 ms"),
//                 count: integer(8043),
//                 percentage: integer(0)
//             },
//             group2: {
//                 name: string("800 ms < t < 1200 ms"),
//                 count: integer(8043),
//                 percentage: integer(0)
//             },
//             group3: {
//                 name: string("t > 1200 ms"),
//                 count: integer(8043),
//                 percentage: integer(0)
//             },
//             group4: {
//                 name: string("failed"),
//                 count: integer(8043),
//                 percentage: integer(0)
//             },
//             meanNumberOfRequestsPerSecond: {
//                 total: decimal(186.0),
//                 ok: decimal(8043),
//                 ko: decimal(0)
//             },
//         }
//
//     describe("get /stats/e31b41e3-e677-4840-a590-c059eb6ca9d9", () => {
//         before(done => {
//             const interaction = {
//                 state: "a request for a single stats",
//                 uponReceiving: "a request for a single stats",
//                 withRequest: {
//                     method: "GET",
//                     path: "/api/gatling-tool/stats/e31b41e3-e677-4840-a590-c059eb6ca9d9",
//                     headers: {
//                         Accept: "application/json",
//                     },
//                 },
//                 willRespondWith: {
//                     status: 200,
//                     headers: {
//                         'Content-Type': regex({generate: 'application/json', matcher: '^application\/json.*'}),
//                     },
//                     body: EXPECTED_BODY,
//                 },
//             }
//             provider.addInteraction(interaction).then(() => {
//                 done()
//             })
//         })
//
//         it("returns the correct response", done => {
//             const axiosParams = {
//                 url: url,
//                 port: port,
//                 id: "e31b41e3-e677-4840-a590-c059eb6ca9d9",
//             }
//
//             // retrieveStats(axiosParams).then(response => {
//             //     try {
//             //         expect(response.status).to.eql(200)
//             //     } catch (e) {
//             //     }
//             //     done()
//             // }, done)
//         })
//     })
// })