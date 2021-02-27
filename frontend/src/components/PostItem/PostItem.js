import {ListGroup} from "react-bootstrap";

const {useHistory} = require('react-router-dom')

function PostItem(props) {

    let history = useHistory();

    const handleClick = (id) => {
        history.push(`/post/${id}`);
    }

    return (
        <ListGroup.Item onClick={() => handleClick(props.id)}>
            {props.value}
        </ListGroup.Item>
    );
}

export default PostItem;
