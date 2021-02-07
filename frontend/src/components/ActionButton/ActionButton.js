import React from 'react';
import './ActionButton.css';

import Button from "react-bootstrap/Button";

import * as PropTypes from "prop-types";

function ActionButton(props) {
    return <Button className="custom-btn" onClick={props.onClick}>
        {props.text}
    </Button>;
}

ActionButton.propTypes = {onClick: PropTypes.func};

export default ActionButton
