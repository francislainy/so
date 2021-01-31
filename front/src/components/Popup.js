import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CustomDropdown} from "./CustomDropdown";
import FileUpload from "./FileUpload";

const Popup = (props) => {

    const onHide = props.onHide
    const show = props.show
    const onConfirm = props.onConfirm

    const [categoryTitle, setCategoryTitle] = useState()

    const [inputValues, setInputValues] = useState({

        categoryTitle: categoryTitle, categoryId: ''
    });

    const onChangeHandler = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    };

    const onHandleChangeCategory = (title, categoryId) => {

        setCategoryTitle(title);

        let newInputValues = {
            categoryTitle: title,
            categoryId: categoryId
        }

        setInputValues(newInputValues)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Gatling Report Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FileUpload onClick={onHide} onFileAdded={props.onFileAdded}/>
                <br/>
                <input name={"categoryTitle"} style={{width: "100%", marginBottom: "20px"}}
                       onChange={onChangeHandler}
                       value={categoryTitle}
                />
                <CustomDropdown onHandleChangeCategory={onHandleChangeCategory}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={() => onConfirm(inputValues)}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup
