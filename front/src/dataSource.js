import React from "react";

export const columns = [
    {
        Header: 'Name',
        accessor: 'title',
        filter: "text"
    },
    {
        Header: 'Run Date',
        accessor: 'runDate',
        filter: "text"
    },
    {
        Header: 'Created',
        accessor: 'createdDate',
        filter: "text"
    },
    {
        Header: 'Category',
        accessor: 'category',
        filter: "text"
    },
    {
        Header: 'Actions',
        accessor: 'actions',
    },
];

export const columnsCategory = [
    {
        Header: 'ID',
        accessor: 'id',
        filter: "text"
    },
    {
        Header: 'Name',
        accessor: 'title',
        filter: "text"
    },
    {
        Header: 'Actions',
        accessor: 'actions',
    },
];
