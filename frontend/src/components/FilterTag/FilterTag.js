import './FilterTag.css'
import Button from "react-bootstrap/Button";

function FilterTag(props) {

    return (
        <div className="FilterTag" onClick={() => props.handleClick(props.item)}>
            {props.isSelected ? <div className="FilterTag">
                <Button style={styles.Active} className="custom-btn">{props.title}</Button>
            </div> : <div className="FilterTag">
                <Button style={styles.Inactive} className="custom-btn">{props.title}</Button>
            </div>
            }
        </div>
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
