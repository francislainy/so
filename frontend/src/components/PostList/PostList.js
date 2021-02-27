import React, {useEffect, useState} from 'react';

import PostItem from '../PostItem/PostItem'
import {getQuestionList} from '../../api/api'
import {userId} from "../../helpers/Constants";
import {ListGroup} from "react-bootstrap";

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
        <ListGroup variant="flush" style={{width: "100%"}}>
            {data.questions.map((item) => <PostItem key={item.id} id={item.id} value={item.title}/>)}
        </ListGroup>
    );
}

export default PostList;
