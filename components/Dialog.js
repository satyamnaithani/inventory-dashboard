import { Modal } from 'react-bootstrap';

const Dialog = ({ show, handleClose, title, children }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg" keyboard={false}>
            <Modal.Header closeButton><Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

export default Dialog;