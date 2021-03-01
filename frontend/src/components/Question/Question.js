import React from "react";
import {userId} from "../../helpers/Constants";
import * as PropTypes from "prop-types";

function Question(props) {
    return <>
        <h1>
            {props.data.title}
        </h1>
        <h3>
            {props.data.description}
        </h3>
        {props.data.userId === userId &&
        <div>
            <i className="fas fa-edit" onClick={props.onEdit} style={{marginRight: '20px'}}/>
            <i className="fas fa-trash" onClick={props.onDelete}/>
        </div>
        }
    </>;
}

Question.propTypes = {
    data: PropTypes.shape({}),
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onSubmitAnswer: PropTypes.func
};

export default Question;
