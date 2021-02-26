import Button from "react-bootstrap/Button";

function FilterTag(props) {
    return (
        <Button onClick={() => props.handleClick(props.item)}
                style={props.isSelected ? styles.Active : styles.Inactive}
                className="custom-btn">{props.title}</Button>
    );
}

const styles = {
    Active: {
        backgroundColor: 'orange'
    },
    Inactive: {
        backgroundColor: 'grey'
    },
}

export default FilterTag;
