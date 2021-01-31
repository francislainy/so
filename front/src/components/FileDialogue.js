import React, {useEffect, useState} from "react";
import '../css/FormStyle.css'
import {FolderOpen} from "@material-ui/icons";

function FileDialogue() {

    function buildFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        return fileSelector;
    }

    const [fileSelector, seFileSelector] = useState(buildFileSelector());

    useEffect(() => {
        // fileSelector = buildFileSelector();
        seFileSelector(buildFileSelector())
    }, [])

    const handleFileSelect = (e) => {
        e.preventDefault();
        fileSelector.click();
    }

    return (
        <div onClick={handleFileSelect}>
            <form action method="post">
                <div className="form-group">
                    <div className="form-group file-area">
                        <input type="file"/>
                    </div>
                    <div className="file-dummy">
                        <FolderOpen style={{width: 60, height: 60}}/>
                        <div className="default">
                            Click to upload Gatling simulation folder
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default FileDialogue