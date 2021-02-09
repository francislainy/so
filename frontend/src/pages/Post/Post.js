import React, {useEffect, useState} from 'react';

import {port, url, userId} from "../../helpers/Constants";
import {answerQuestion, deleteAnswer, deleteQuestion, editAnswer, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import ActionButton from "../../components/ActionButton/ActionButton";
import Button from "react-bootstrap/Button";

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
        contentEdited: "",
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

    // const handleEditAnswer = (endpoint) => {
    //
    //     // if (showInputEndpoint) {
    //     //     return <input defaultValue={endpoint} onChange={onChangeHandler}/>
    //     // } else {
    //     //     return <span>{endpoint}</span>
    //     // }
    // }

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
                }
            )

    }

    const handleChange = (e) => {

        const {name, value} = e.target;

        if (name === "content") {

            setValues({
                ...values,
                [name]: value,
            });

        } else {

            setValuesEdited({
                ...valuesEdited,
                [name]: value,
            });

        }
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

                    setData({...data})
                    setValues(initialValues)
                    setShowAnswerBox(false)
                    setReload(false)
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
            content: `${valuesEdited.contentEdited}`,
        })
        console.log(values)
    }, [valuesEdited])

    return (
        <div className="App">
            <Ask onClick={handleAsk}/>
            <h1>
                {data.title}
            </h1>
            <h3>
                {data.description}
            </h3>
            {data.userId === userId &&
            <div>
                <ActionButton
                    text="Delete Question"
                    onClick={handleDeleteQuestion}/>
                <ActionButton
                    text="Edit Question"
                    onClick={() => handleEditQuestion(match.params.id)}/>
                <ActionButton
                    text="Submit Answer"
                    onClick={() => handleAnswerBox(match.params.id)}/>
            </div>
            }
            {data.answers !== undefined &&
            data.answers.map((item, i) => {
                return <div>
                    <h1 key={i}>{item.content}</h1>
                    <Button variant="outline-primary" onClick={() => handleEditAnswerBox(i)}>
                        Edit Answer
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleDeleteAnswer(item.id)}>
                        Delete Answer
                    </Button>
                    {showEditAnswerBox && indexClicked === i &&
                    <div>
                    <textarea
                        value={valuesEdited.contentEdited}
                        onChange={handleChange}
                        name="contentEdited"/>
                        <Button variant="outline-primary" onClick={() => handleEditAnswer(item.id)}>
                            Save
                        </Button>
                    </div>
                    }
                </div>
            })
            }

            {showAnswerBox &&
            <div>
                <textarea
                    value={values.content}
                    onChange={handleChange}
                    name="content"/>
                <Button variant="outline-primary" onClick={handleSubmitAnswer}>
                    Save
                </Button>
            </div>
            }
        </div>
    );
}

export default Post;
