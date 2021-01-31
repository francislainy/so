import React from "react";

const {useHistory} = require('react-router-dom')

function Navbar() {

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div><a href="#" className="navbar-brand">Parser</a></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="" onClick={() => handleClick("home")}>Home</a>
                    </li>
                    <li>
                        <a className="nav-link" href="" onClick={() => handleClick("settings")}>Settings</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;