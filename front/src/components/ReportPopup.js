import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CustomDropdown} from "./CustomDropdown";

const ReportPopup = (props) => {

    const [categoryTitle, setCategoryTitle] = useState(props.report.category.title)

    const reportTitle = props.report.title
    const categoryId = props.report.category.id

    const [inputValues, setInputValues] = useState({

        reportTitle: reportTitle, categoryTitle: categoryTitle, categoryId: categoryId
    });

    const onChangeHandler = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    };

    const onHandleChangeCategory = (title, categoryId) => {

        setCategoryTitle(title);

        let newInputValues = {
            reportTitle: inputValues.reportTitle,
            categoryTitle: title,
            categoryId: categoryId
        }
        setInputValues(newInputValues)
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input name={"reportTitle"} style={{width: "100%", marginBottom: "20px"}}
                       onChange={onChangeHandler}
                       value={inputValues.reportTitle}
                />
                <input name={"categoryTitle"} style={{width: "100%", marginBottom: "20px"}}
                       onChange={onChangeHandler}
                       value={categoryTitle}
                />
                <CustomDropdown onHandleChangeCategory={onHandleChangeCategory}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={() => props.onHandleUpdate(inputValues)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReportPopup
