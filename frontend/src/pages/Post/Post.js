import React, {useEffect, useState} from 'react';

import {port, url, userId} from "../../helpers/Constants";
import {deleteQuestion, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import Delete from "../../components/Delete/Delete";

const {useHistory} = require('react-router-dom')

function Post({match}) {

    let history = useHistory();

    const handleAsk = () => {
        history.push(`/post/ask`);
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

    const [data, setData] = useState({});

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
                }
            )

    }, [match.params.id]);

    return (
        <div className="App">
            <h1>
                {data.title}
            </h1>
            <h3>
                {data.description}
            </h3>
            <Ask onClick={handleAsk}/>
            {data.userId === userId &&
            <Delete
                onClick={handleDelete}/>
            }
        </div>

    );
}

export default Post;
