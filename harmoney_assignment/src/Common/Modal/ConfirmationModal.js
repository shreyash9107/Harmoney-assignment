import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const  ConfirmationModal = (props) => {
    return (
        <Modal
            className="action-popup"
            show={props.visibility}
            onHide={props.onHide}
        >
            {/* <Modal.Header /> */}
            <Modal.Body>
                <div className="modal-popup">
                    <p className="fs-18 fw-500">Are you sure you want to delete this source?</p>
                </div>
            </Modal.Body>
            {/*<div className="divider" />*/}
            <Modal.Footer>
                <div className="align-right">
                    <Button variant="light"  onClick={props.onNo}>Cancel</Button>
                    <Button variant="danger"  onClick={props.onYes}>Delete</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;
