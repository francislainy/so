import FilterTag from "../FilterTag/FilterTag";
import {useState} from "react";

function FilterTagList({activeItem}) {

    const [activeListItem, setActiveListItem] = useState({
        id: 1,
        title: "Interesting",
    });

    const [data] = useState([
        {id: 1, title: "Interesting"},
        {id: 2, title: "Bountied"},
        {id: 3, title: "Hot"},
        {id: 4, title: "Week"},
        {id: 5, title: "Month"},
    ])

    const handleClick = (item) => activeListItem === item ?
        noActive() :
        active(item);

    const noActive = () => {
        const currentActiveItem = activeListItem
        setActiveListItem() // Clear list of items so none of them is set to active
        setActiveListItem(currentActiveItem) // We set the item to what it was so that the list is not left without any active item
    }

    const active = (item) => {
        setActiveListItem(item)
        activeItem(item)
    }

    return <div>
        <div className="FilterTagList"
             style={styles.FilterTagList}>
            {
                data.map(i =>
                    <FilterTag
                        key={i.id}
                        item={i}
                        title={i.title}
                        handleClick={handleClick}
                        isSelected={activeListItem.id === i.id}
                    />)
            }
        </div>
    </div>;
}

const styles = {
    FilterTagList: {
        display: "flex",
        flexDirection: "row"
    }
}

export default FilterTagList;
