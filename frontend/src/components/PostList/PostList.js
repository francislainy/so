import React, {useEffect, useState} from 'react';

import PostItem from '../PostItem/PostItem'
import {getQuestionList} from '../../api/api'
import {port, url, userId} from "../../helpers/Constants";

function PostList(props) {

    const [data, setData] = useState(
        {
            questions: [
                {
                    id: "",
                    title: "",
                    creationDate: 0
                }
            ]
        });

    useEffect(() => {

        const axiosParams = {
            url: url,
            port: port,
            userId: userId
        }

        getQuestionList(axiosParams)

            .then(({data}) => {
                    setData({...data})
                    console.log('success')
                }
            ).catch(reason => {
            console.log(reason + ' failure on retrieving question list')
        })

    }, [props.tagItemId])

    return (
        <ul>
            {data.questions.map((item) => <PostItem key={item.id} id={item.id} value={item.title}/>)}
        </ul>
    );
}

export default PostList;
