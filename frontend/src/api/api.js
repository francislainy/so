const axios = require("axios")

exports.getQuestionList = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const userId = endpoint.userId

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "api/so/questions",
        headers: {Accept: "application/json", Authorization: userId},
    })
}

exports.getQuestionItem = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const userId = endpoint.userId

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: `api/so/questions/${id}`,
        headers: {Accept: "application/json", Authorization: userId},

    })
}

exports.createQuestion = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const payload = endpoint.payload
    const userId = endpoint.userId

    return axios.request({
        method: "POST",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/so/questions`,
        headers: {Accept: "application/json", Authorization: userId},
    })
}

exports.deleteQuestion = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const userId = endpoint.userId

    return axios.request({
        method: "DELETE",
        baseURL: `${url}:${port}`,
        url: `api/so/questions/${id}`,
        headers: {Accept: "application/json", Authorization: userId},
    })
}
