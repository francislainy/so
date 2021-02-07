import React, {useEffect, useState} from 'react';

import {port, url, userId} from "../../helpers/Constants";
import {deleteQuestion, getQuestionItem} from "../../api/api";
import Ask from "../../components/Ask/Ask";
import ActionButton from "../../components/ActionButton/ActionButton";

const {useHistory} = require('react-router-dom')

function Post({match}) {

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
            </div>
            }
            {data.answers !== undefined &&
            data.answers.map((item) => {
                return <h1 key={item.id}>{item.content}</h1>
            })
            }
        </div>

    );
}

export default Post;
