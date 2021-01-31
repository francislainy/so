import React from 'react';
import './Ask.css';

import Button from "react-bootstrap/Button";

import * as PropTypes from "prop-types";

function Ask(props) {
    return <Button className="custom-btn" onClick={props.onClick}>
        Ask Question
    </Button>;
}

Ask.propTypes = {onClick: PropTypes.func};

export default Ask
