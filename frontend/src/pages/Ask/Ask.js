import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";

import {port, url, userId} from "../../helpers/Constants";
import {createQuestion} from "../../api/api";

const moment = require("moment");
const {useHistory} = require('react-router-dom')

function Ask() {

    let history = useHistory();

    const initialValues = {
        title: "",
        description: "",
    };

    const [values, setValues] = useState(initialValues);
    const [payload, setPayload] = useState({});

    const handleChange = (e) => {

        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

    useEffect(() => {
        setPayload({
            "title": `${values.title}`,
            "creationDate": moment().unix(),
            "description": `${values.description}`,
        })
    }, [values])

    const handleClick = () => {

        // set payload data based of state from input and textarea
        const axiosParams = {
            url: url,
            port: port,
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
