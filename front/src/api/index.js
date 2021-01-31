"use strict"

const axios = require("axios")

exports.getMeCategoryIncludeReports = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "api/gatling-tool/category/58330784-983c-4ae9-a5a1-d8f8d2b70a59/include-reports",
        headers: {Accept: "application/json"},
    })
}

exports.retrieveReports = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "api/gatling-tool/report",
        headers: {Accept: "application/json"},
    })
}

exports.deleteReport = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "DELETE",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/report/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.retrieveReportItem = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/report/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.updateReport = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const payload = endpoint.payload

    return axios.request({
        method: "PUT",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/report/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.createReport = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const payload = endpoint.payload

    return axios.request({
        method: "POST",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/report`,
        headers: {Accept: "application/json"},
    })
}

exports.retrieveStatsForReport = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/stats/report/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.deleteStats = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "DELETE",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/stats/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.updateStatsEndpoint = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const payload = endpoint.payload

    return axios.request({
        method: "PUT",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/stats/${id}/endpoint`,
        headers: {Accept: "application/json"},
    })
}

exports.retrieveCategories = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "api/gatling-tool/category",
        headers: {Accept: "application/json"},
    })
}

exports.createCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const payload = endpoint.payload

    return axios.request({
        method: "POST",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/category`,
        headers: {Accept: "application/json"},
    })
}

exports.retrieveCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/category/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.updateCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const payload = endpoint.payload

    return axios.request({
        method: "PUT",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/category/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.deleteCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id

    return axios.request({
        method: "DELETE",
        baseURL: `${url}:${port}`,
        url: `api/gatling-tool/category/${id}`,
        headers: {Accept: "application/json"},
    })
}

exports.submitJsonStats = endpoint => {
    const url = endpoint.url
    const port = endpoint.port
    const id = endpoint.id
    const payload = endpoint.payload

    return axios.request({
        method: "POST",
        baseURL: `${url}:${port}`,
        data: payload,
        url: `api/gatling-tool/json/import/${id}`,
        headers: {'Content-Type': "multipart/form-data"},
    })
}

exports.getMeCategories = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/category",
        headers: {Accept: "application/json"},
    })
}

exports.getMeDogs = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/dogs",
        headers: {Accept: "application/json"},
    })
}

exports.getMeDog = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/dogs/1",
        headers: {Accept: "application/json"},
    })
}

exports.getMeCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/category/cdb02322-a8a6-4acf-9644-ddf8b24af9e6",
        headers: {Accept: "application/json"},
    })
}