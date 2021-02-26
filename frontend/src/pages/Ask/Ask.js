import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {useLocation} from "react-router-dom";

import {userId} from "../../helpers/Constants";
import {createQuestion, editQuestion} from "../../api/api";

const moment = require("moment");
const {useHistory} = require('react-router-dom')

function Ask({match}) {

    let history = useHistory();
    let location = useLocation();

    let data;
    if (location.state !== undefined) {
        data = location.state.data
    }

    let initialValues;
    initialValues = {
        title: "",
        description: "",
    }

    const [values, setValues] = useState(initialValues);
    const [payload, setPayload] = useState({});

    useEffect(() => {
        if (data !== undefined) {
            initialValues = {
                title: data.title,
                description: data.description,
            };
            setValues(initialValues)
        }
    }, [data !== undefined])

    const handleChange = (e) => {

        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

    useEffect(() => {
        setPayload({
            title: `${values.title}`,
            creationDate: moment().unix(),
            description: `${values.description}`,
        })
    }, [values])

    const handleClick = () => {

        if (data === undefined) { // When there's no data object it means we are creating a new question

            // set payload data based of state from input and textarea
            const axiosParams = {
                payload: payload,
                userId: userId,
            }

            createQuestion(axiosParams, payload)

                .then((response) => {
                        // show success message ;
                        history.push(`/`);
                    }
                ).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        } else {

            // set payload data based of state from input and textarea
            const axiosParams = {
                id: match.params.id,
                payload: payload,
                userId: userId,
            }

            editQuestion(axiosParams, payload)

                .then((response) => {
                        // show success message ;
                        history.push(`/`);
                    }
                ).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        }
    }

    const handleEdit = () => {
        const axiosParams = {
            id: match.params.id,
            userId: userId,
        }

        editQuestion(axiosParams)

            .then(() => {
                    console.log("question edited");
                    history.push(`/`);
                }
            )

    }

    return (
        <div className="Ask" style={{marginLeft: '20px'}}>
            <div style={{flexDirection: 'column'}}>
                <h1>
                    Ask a public question
                </h1>
                <p>Title</p>
                <input type="text"
                       onChange={handleChange}
                       name="title"
                       value={values.title}/>
                <br/>
                <p>Body</p>
                <textarea
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    rows={5}
                    cols={5}
                />
                <br/>
                <Button variant="outline-primary" onClick={handleClick}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default Ask;
