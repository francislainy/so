import React, {useEffect, useState} from 'react';

import {port, url, userId} from "../../helpers/Constants";
import {answerQuestion, deleteAnswer, deleteQuestion, editAnswer, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import Question from "../../components/Question/Question";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";

const {useHistory} = require('react-router-dom')

function Answer(props) {
    return <div>
        <h1>{props.item.content}</h1>
        <Button variant="outline-primary" onClick={props.onHandleAnswerBox}>
            Edit Answer
        </Button>
        <Button variant="outline-primary" onClick={props.onDelete}>
            Delete Answer
        </Button>
        {props.showEditAnswerBox && props.indexClicked === props.i &&
        <AnswerBody value={props.values.content}
                    onChange={props.onChange}
                    buttonName={props.buttonName}
                    onClick={props.onEdit}/>
        }
    </div>;
}

Answer.propTypes = {
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

AnswerBody.propTypes = {
    values: PropTypes.shape({content: PropTypes.string}),
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

function Post({match}) {

    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [showEditAnswerBox, setShowEditAnswerBox] = useState(false)
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);
    const [indexClicked, setIndexClicked] = useState()
    const [payload, setPayload] = useState({});
    const [payloadEdited, setPayloadEdited] = useState({});

    let initialValues;
    initialValues = {
        content: "",
    }
    const [values, setValues] = useState(initialValues);
    const [valuesEdited, setValuesEdited] = useState(initialValues);

    let history = useHistory();

    const handleAsk = () => {
        history.push(`/post/ask`);
    }

    const handleEditQuestion = (id) => {
        history.push({
            pathname: `/post/edit/${id}`,
            state: {data: data}
        });
    }

    const handleEditAnswerBox = (index) => {
        setShowEditAnswerBox(true)
        setIndexClicked(index)
    }

    const handleAnswerBox = () => {
        setShowAnswerBox(true)
    }

    const handleSubmitAnswer = () => {

        const axiosParams = {
            url: url,
            port: port,
            id: match.params.id,
            payload: payload,
            userId: userId,
        }

        answerQuestion(axiosParams, payload)

            .then((response) => {
                    // show success message ;
                    console.log('answer submitted');
                    // history.push(`/`);
                    setReload(true)
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }

    const handleDeleteQuestion = () => {
        const axiosParams = {
            url: url,
            port: port,
            id: match.params.id,
            userId: userId,
        }

        deleteQuestion(axiosParams)

            .then(() => {

                    console.log("question deleted");
                    history.push(`/`);
                }
            )
    }

    const handleDeleteAnswer = (answerId) => {
        const axiosParams = {
            url: url,
            port: port,
            id: match.params.id,
            answerId: answerId,
            userId: userId,
        }

        deleteAnswer(axiosParams)

            .then(() => {

                    console.log("answer deleted");
                    setReload(true);
                }
            )
    }

    const handleEditAnswer = (answerId) => {

        const axiosParams = {
            url: url,
            port: port,
            questionId: match.params.id,
            answerId: answerId,
            userId: userId,
            payload: payloadEdited
        }

        editAnswer(axiosParams)

            .then(() => {

                    console.log("answer edited");
                    setReload(true);
                    setValuesEdited(initialValues);
                    setShowEditAnswerBox(false);
                    setShowAnswerBox(false);
                }
            )

    }

    const handleChangeSubmitAnswer = (e) => {

        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }


    const handleChangeEditAnswer = (e) => {

        const {name, value} = e.target;

        setValuesEdited({
            ...valuesEdited,
            [name]: value,
        });

    }

    useEffect(() => {

        const axiosParams = {
            url: url,
            port: port,
            id: match.params.id,
            userId: userId,
        }

        getQuestionItem(axiosParams)

            .then(({data}) => {

                    setData({...data});
                    setValues(initialValues);
                    setShowAnswerBox(false);
                    setShowEditAnswerBox(false);
                    setReload(false);
                }
            )

    }, [match.params.id, reload === true]);

    useEffect(() => {
        setPayload({
            content: `${values.content}`,
        })
        console.log(values)
    }, [values])

    useEffect(() => {
        setPayloadEdited({
            content: `${valuesEdited.content}`,
        })
        console.log(valuesEdited)
    }, [valuesEdited.content])

    return (
        <div className="App">
            <Ask onClick={handleAsk}/>
            <Question data={data}
                      onDelete={handleDeleteQuestion}
                      onEdit={() => handleEditQuestion(match.params.id)}
                      onSubmitAnswer={() => handleAnswerBox(match.params.id)}/>
            {data.answers !== undefined &&
            data.answers.map((item, i) => {
                return <Answer key={i} item={item} onHandleAnswerBox={() => handleEditAnswerBox(i)}
                               buttonName="Save Edited"
                               onDelete={() => handleDeleteAnswer(item.id)} showEditAnswerBox={showEditAnswerBox}
                               indexClicked={indexClicked} i={i} values={valuesEdited} onChange={handleChangeEditAnswer}
                               onEdit={() => handleEditAnswer(item.id)}/>
            })
            }

            {showAnswerBox &&
            <AnswerBody values={values} buttonName="Save New" onChange={handleChangeSubmitAnswer} onClick={handleSubmitAnswer}/>
            }
        </div>
    );
}

export default Post;
