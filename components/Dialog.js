import { Modal } from 'react-bootstrap';

const Dialog = ({ show, handleClose, title, children, size }) => {
    return (
        <Modal animation={false} show={show} onHide={handleClose} size={size} backdrop="static" keyboard={false}>
            <Modal.Header closeButton><Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}

export default Dialog;