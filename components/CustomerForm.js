import { Form, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

const CustomerForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [gstin, setGstin] = useState("");
    const [dl, setDl] = useState("");
    const [contact, setContact] = useState("");
    const [person, setPerson] = useState("");

    const handleCustomerSubmitForm = (e) => {
        e.preventDefault();
        const customer = {
            name: name,
            address: address,
            city: city,
            state: state,
            zip: zip,
            gst: gstin,
            dl: dl,
            contact: contact,
            person: person
        }
        console.log(customer);
    }
    return (
        <Form onSubmit={handleCustomerSubmitForm}>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control required value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={4}>
                    <Form.Label>City</Form.Label>
                    <Form.Control required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                </Col>
                <Col xs={4}>
                    <Form.Label>State</Form.Label>
                    <Form.Control required value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                </Col>
                <Col xs={4}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control required value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={4}>
                    <Form.Label>GSTIN</Form.Label>
                    <Form.Control value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="GSTIN" />
                </Col>
                <Col xs={4}>
                    <Form.Label>DL</Form.Label>
                    <Form.Control value={dl} onChange={(e) => setDl(e.target.value)} placeholder="DL" />
                </Col>
                <Col xs={4}>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>Person</Form.Label>
                    <Form.Control value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" />
                </Col>
            </Form.Row>
            <br/>
            <Button type="submit" block variant="success">Add</Button>
        </Form>
    );
}


export default CustomerForm;