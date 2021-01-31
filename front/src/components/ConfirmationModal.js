import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = (props) => {

    const onHide = props.onHide
    const onConfirm = props.onConfirm
    const show = props.show

    return (
        <Modal show={show} onHide={onHide}>
            {props.showHeader && <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            }
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    {props.cancel}
                </Button>
                <Button variant="outline-primary" onClick={onConfirm}>
                    {props.ok}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal
