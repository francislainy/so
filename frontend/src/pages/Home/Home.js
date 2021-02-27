import FilterTagList from "../../components/FilterTagList/FilterTagList";
import PostList from "../../components/PostList/PostList";
import React, {useState} from "react";
import Ask from "../../components/Ask/Ask";

import {Col, Container, Row} from "react-bootstrap";

const {useHistory} = require('react-router-dom')

function Home() {

    let history = useHistory();

    const handleClick = () => {
        history.push(`/post/ask`);
    }

    const [activeListItem, setActiveListItem] = useState({});

    const activeItem = (item) => {
        setActiveListItem(item)
    }

    return (
        <>
            <Container fluid>
                <Container sm={4} md={4}/>
                <Container sm={4} md={4}>
                    <Row>
                        <Col sm={8} md={8} style={{display: "flex", justifyContent: "flex-center"}}>
                            <FilterTagList
                                tagItemId={activeListItem.id}
                                activeListItem={activeListItem}
                                activeItem={activeItem}
                            />
                        </Col>
                        <Col sm={4}
                             md={4}
                             style={{display: "flex", justifyContent: "flex-end"}}>
                            <Ask onClick={handleClick}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col  sm={12}
                              md={12} style={{display: "flex", justifyContent: "flex-start", marginTop: "10px", marginBottom: "10px"}}>
                            <PostList
                                tagItemId={activeListItem.id}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container sm={4} md={4}/>
            </Container>
        </>
    );
}

export default Home;
