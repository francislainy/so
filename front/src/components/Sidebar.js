import React from "react";

const {useHistory} = require('react-router-dom')

function Sidebar() {

    let history = useHistory();

    const handleClick = (section) => {

        switch (section) {
            case "home":
                history.push("/")
                break;
            case "settings":
                history.push("/settings");
                break;
        }

    };

    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading bg-dark" style={{color: "#fff"}}>Parser</div>
            {/*<div className="list-group list-group-flush">*/}
            {/*    <a href="" onClick={() => handleClick("home")}*/}
            {/*       className="list-group-item list-group-item-action bg-light">Dashboard</a>*/}
            {/*    <a href="" onClick={() => handleClick("settings")}*/}
            {/*       className="list-group-item list-group-item-action bg-light">Shortcuts</a>*/}
            {/*</div>*/}
        </div>
    );
}

export default Sidebar