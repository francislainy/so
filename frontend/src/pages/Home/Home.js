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
        <Container fluid>
            <Row>
                <Col sm={8} md={8} style={{display: "flex"}}>
                    <FilterTagList
                        tagItemId={activeListItem.id}
                        activeListItem={activeListItem}
                        activeItem={activeItem}
                    />
                </Col>
                <Col sm={4}
                     md={4}
                     style={{ display: "flex", justifyContent: "flex-end", verticalAlign: "middle" }}>
                    <Ask onClick={handleClick}/>
                </Col>
            </Row>
            <Row>
                <Col sm={2} md={2}>
                    <div></div>
                </Col>
                <Col sm={8} md={8} style={{ display: "flex" }}>
                <PostList
                    tagItemId={activeListItem.id}
                />
                </Col>
                <Col sm={2} md={2}>
                    <div>hi</div>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
