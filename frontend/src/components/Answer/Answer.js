import * as PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/Button";

AnswerBody.propTypes = {
    values: PropTypes.shape({content: PropTypes.string}),
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

export function AnswerItem(props) {
    return <div>
        <h1>{props.item.content}</h1>
        <i className="fas fa-edit" onClick={props.onHandleAnswerBox} style={{marginRight: '20px'}}/>
        <i className="fas fa-trash" onClick={props.onDelete}/>
        {props.showEditAnswerBox && props.indexClicked === props.i &&
        <AnswerBody value={props.values.content}
                    onChange={props.onChange}
                    buttonName={props.buttonName}
                    onClick={props.onEdit}/>
        }
    </div>;
}

AnswerItem.propTypes = {
    item: PropTypes.any,
    onHandleAnswerBox: PropTypes.func,
    onDelete: PropTypes.func,
    showEditAnswerBox: PropTypes.bool,
    indexClicked: PropTypes.func,
    i: PropTypes.any,
    values: PropTypes.shape({content: PropTypes.string}),
    onChange: PropTypes.func,
    onEdit: PropTypes.func
};

function AnswerBody(props) {
    return <div>
                <textarea
                    value={props.value}
                    onChange={props.onChange}
                    name="content"/>
        <Button variant="outline-primary" onClick={props.onClick}>
            {props.buttonName}
        </Button>
    </div>;
}

export default function Answer(props) {
    return <div>
        {props.data.answers !== undefined &&
        props.data.answers.map(props.prop1)
        }

        {props.showAnswerBox &&
        <AnswerBody values={props.values} buttonName="Save New" onChange={props.onChange}
                    onClick={props.onClick}/>
        }
    </div>;
}

Answer.propTypes = {
    data: PropTypes.shape({}),
    prop1: PropTypes.func,
    showAnswerBox: PropTypes.bool,
    values: PropTypes.shape({content: PropTypes.string}),
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

