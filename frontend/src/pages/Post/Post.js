import React, {useEffect, useState} from 'react';

import {port, url, userId} from "../../helpers/Constants";
import {answerQuestion, deleteQuestion, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import ActionButton from "../../components/ActionButton/ActionButton";
import Button from "react-bootstrap/Button";

const {useHistory} = require('react-router-dom')

function Post({match}) {

    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);

    let initialValues;
    initialValues = {
        content: "",
    }
    const [values, setValues] = useState(initialValues);
    const [payload, setPayload] = useState({});

    let history = useHistory();

    const handleAsk = () => {
        history.push(`/post/ask`);
    }

    const handleEdit = (id) => {
        history.push({
            pathname: `/post/edit/${id}`,
            state: {data: data}
        });
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
                    console.log('answer submitted') //todo: reload component when answer submitted - 07/02/21
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

    const handleDelete = () => {
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
    const handleChange = (e) => {

        const {name, value} = e.target;

        setValues({
            ...values,
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
                    onClick={handleDelete}/>
                <ActionButton
                    text="Edit Question"
                    onClick={() => handleEdit(match.params.id)}/>
                <ActionButton
                    text="Submit Answer"
                    onClick={() => handleAnswerBox(match.params.id)}/>
            </div>
            }
            {data.answers !== undefined &&
            data.answers.map((item) => {
                return <h1 key={item.id}>{item.content}</h1>
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
