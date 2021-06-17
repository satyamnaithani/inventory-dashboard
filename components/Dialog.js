import { Modal, Button } from 'react-bootstrap';
const Dialog = ({show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg" keyboard={false}>
            <Modal.Header closeButton><Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, reading this text in a modal!</Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

export default Dialog;