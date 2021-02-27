import React, {useEffect, useState} from 'react';

import {userId} from "../../helpers/Constants";
import {answerQuestion, deleteAnswer, deleteQuestion, editAnswer, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import Question from "../../components/Question/Question";
import Answer, {AnswerItem} from "../../components/Answer/Answer"
import {Col, Container, Row} from "react-bootstrap";

const {useHistory} = require('react-router-dom')

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
        <Container>
            <Row>
                <Col md={9} sm={9}>
                    <Question data={data}
                              onDelete={handleDeleteQuestion}
                              onEdit={() => handleEditQuestion(match.params.id)}
                              onSubmitAnswer={() => handleAnswerBox(match.params.id)}/>
                </Col>
                <Col md={3} sm={3} style={{display: "flex", justifyContent: "flex-end"}}>
                    <Ask onClick={handleAsk}/>
                </Col>
            </Row>
            <Answer data={data} prop1={(item, i) => {
                return <AnswerItem key={i}
                                   item={item}
                                   onHandleAnswerBox={() => handleEditAnswerBox(i)}
                                   buttonName="Save Edited"
                                   onDelete={() => handleDeleteAnswer(item.id)}
                                   showEditAnswerBox={showEditAnswerBox}
                                   indexClicked={indexClicked} i={i} values={valuesEdited}
                                   onChange={handleChangeEditAnswer}
                                   onEdit={() => handleEditAnswer(item.id)}/>
            }} showAnswerBox={showAnswerBox} values={values} onChange={handleChangeSubmitAnswer}
                    onClick={handleSubmitAnswer}/>
        </Container>
    );
}

export default Post;
