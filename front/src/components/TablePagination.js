import React from "react";
import * as PropTypes from "prop-types";

export class TablePagination extends React.Component {
    render() {
        return <div>
            <button className="paging" onClick={this.props.onClick}
                    disabled={!this.props.canPreviousPage}>{"<<"}</button>
            {" "}
            <button onClick={this.props.onClick1} disabled={!this.props.canPreviousPage}>
                {"<"}
            </button>
            {" "}
            <button onClick={this.props.onClick2} disabled={!this.props.canNextPage}>
                {">"}
            </button>
            {" "}
            <button onClick={this.props.onClick3} disabled={!this.props.canNextPage}>
                {">>"}
            </button>
            {" "}
            <span>
          Page{" "}
                <strong>
            {this.props.pageIndex + 1} of {this.props.pageOptions.length}
          </strong>{" "}
        </span>
            <span>
          | Go to page:{" "}
                <input
                    type="number"
                    defaultValue={this.props.pageIndex + 1}
                    onChange={this.props.onChange}
                    style={{width: "100px"}}
                />
        </span>{" "}
            <select
                value={this.props.value}
                onChange={this.props.onChange1}
            >
                {[5, 10, 20, 30, 40, 50].map(this.props.callbackfn)}
            </select>
        </div>;
    }
}

TablePagination.propTypes = {
    onClick: PropTypes.func,
    canPreviousPage: PropTypes.any,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func,
    canNextPage: PropTypes.any,
    onClick3: PropTypes.func,
    pageIndex: PropTypes.any,
    pageOptions: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    onChange1: PropTypes.func,
    callbackfn: PropTypes.func
};