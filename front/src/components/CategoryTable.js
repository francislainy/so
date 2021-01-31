import React from "react";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {columnsCategory} from '../dataSource';
import {TablePagination} from "./TablePagination";
import DefaultColumnFilter from "./FilterInputTable";

const {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} = require('react-table')

const CategoryTable = ({data, handleDeletePopUp}) => {

    const columns = columnsCategory

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
            defaultColumn,
            filterTypes
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    return (
        <div className="margin10">
            <table {...getTableProps()} className="table table-bordered tableReport">
                <thead className="thead-dark">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                onClick={() => column.toggleSortBy(!column.isSortedDesc)}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </span>
                                {
                                    column.Header !== "Actions" &&
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                }
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            <td>{row.original.id}</td>
                            <td>{row.original.title}</td>
                            <td>
                                <IconButton onClick={() => handleDeletePopUp(row.original.id)}>
                                    <Delete/>
                                </IconButton>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="tablePagination">
                <TablePagination onClick={() => gotoPage(0)} canPreviousPage={canPreviousPage}
                                 onClick1={() => previousPage()} onClick2={() => nextPage()} canNextPage={canNextPage}
                                 onClick3={() => gotoPage(pageCount - 1)} pageIndex={pageIndex}
                                 pageOptions={pageOptions}
                                 onChange={e => {
                                     const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                     gotoPage(page);
                                 }} value={pageSize} onChange1={e => {
                    setPageSize(Number(e.target.value));
                }} callbackfn={pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                )}/>
            </div>
        </div>
    )
}

export default CategoryTable