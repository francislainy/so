import FilterTagList from "../../components/FilterTagList/FilterTagList";
import PostList from "../../components/PostList/PostList";
import React, {useState} from "react";
import Ask from "../../components/Ask/Ask";

import './Home.css';

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
        <div className="Home">
            <div className="buttons-container">
                <FilterTagList
                    tagItemId={activeListItem.id}
                    activeListItem={activeListItem}
                    activeItem={activeItem}
                />
                <Ask onClick={handleClick} style={{flexDirection: 'row', background: 'red'}}/>
            </div>
            <PostList
                tagItemId={activeListItem.id}
            />
        </div>
    );
}

export default Home;
