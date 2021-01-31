const {useHistory} = require('react-router-dom')

function PostItem(props) {

    let history = useHistory();

    const handleClick = (id) => {
        history.push(`/post/${id}`);
    }

    return (
        <div className="App" onClick={() => handleClick(props.id)}>
            <li>{props.value}</li>
        </div>
    );
}

export default PostItem;
