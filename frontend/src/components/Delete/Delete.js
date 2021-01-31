import React from 'react';
import './Delete.css';

import Button from "react-bootstrap/Button";

import * as PropTypes from "prop-types";

function Delete(props) {
    return <Button className="custom-btn" onClick={props.onClick}>
        Delete Question
    </Button>;
}

Delete.propTypes = {onClick: PropTypes.func};

export default Delete
