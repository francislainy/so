import React from "react";
import {userId} from "../../helpers/Constants";
import ActionButton from "../ActionButton/ActionButton";
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
            <ActionButton
                text="Delete Question"
                onClick={props.onDelete}/>
            <ActionButton
                text="Edit Question"
                onClick={props.onEdit}/>
            <ActionButton
                text="Submit Answer"
                onClick={props.onSubmitAnswer}/>
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
