import { Form, Col, Button } from 'react-bootstrap';
import { useState } from 'react';


const ItemForm = () => {
    const categoryArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const gstArr = [1, 2, 3, 4, 5, 6, 7, 8];
    const uomArr = [1, 2, 3, 4, 5, 6];
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [hsn, setHsn] = useState("");
    const [gst, setGst] = useState("");
    const [uom, setUom] = useState("");
    const [mfgName, setMfgName] = useState("");
    const handleItemFormSubmit = (e) => {
        e.preventDefault();
        const item = {
            category: category,
            name: name,
            hsn: hsn,
            gst: gst,
            uom: uom,
            mfg_name: mfgName
        }
        console.log(item);
    }
    return (
        <Form onSubmit={handleItemFormSubmit}>
            <Form.Row>
                <Col xs={12}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control required value={category} onChange={(e) => setCategory(e.target.value)} defaultValue={""} as="select">
                            <option value="" disabled> -- select category -- </option>
                            {categoryArr.map((ctgry, index) => <option key={index}>{ctgry}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control required value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>HSN</Form.Label>
                    <Form.Control required value={hsn} onChange={(e) => setHsn(e.target.value)} placeholder="HSN" />
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={6}>
                    <Form.Group>
                        <Form.Label>GST%</Form.Label>
                        <Form.Control required value={gst} onChange={(e) => setGst(e.target.value)} defaultValue={""} as="select">
                            <option value="" disabled> -- select GST% -- </option>
                            {gstArr.map((gst_percent, index) => <option key={index}>{gst_percent}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group>
                        <Form.Label>Unit Of Measurement</Form.Label>
                        <Form.Control required value={uom} onChange={(e) => setUom(e.target.value)} defaultValue={""} as="select">
                            <option value="" disabled> -- select UOM -- </option>
                            {uomArr.map((uom_type, index) => <option key={index}>{uom_type}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
            <br/>
            <Form.Row>
                <Col xs={12}>
                    <Form.Label>Manufacturer Company</Form.Label>
                    <Form.Control required value={mfgName} onChange={(e) => setMfgName(e.target.value)} placeholder="Manufacturer Company Name" />
                </Col>
            </Form.Row>
            <br/>
            <Button type="submit" block variant="success">Add</Button>
        </Form>
    );
}


export default ItemForm;