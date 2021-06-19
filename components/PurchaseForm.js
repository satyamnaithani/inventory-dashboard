import { Form, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Table } from '../components';
import { useGetData } from '../config/fetchApi';

const PurchaseForm = () => {
    const [vendorName, setVendorName] = useState();
    const [billNo, setBillNo] = useState();
    const [billDate, setBillDate] = useState();
    const [receiveDate, setReceiveDate] = useState();

    const [lot, setLot] = useState();
    const [exp, setExp] = useState();
    const [item, setItem] = useState();
    const [rate, setRate] = useState();
    const [quantity, setQuantity] = useState();

    const [itemInfo, setItemInfo] = useState([]);
    const [itemTableRows] = useState(['Item', 'lot', 'Exp', 'rate', 'quantity', 'Remove']);
    const { data: fetchedItems, error: itemFetchError } = useGetData("items");
    const { data: fetchedvendors, error: vendorFetchError } = useGetData("vendors");
    let items = [], vendors = [];
    if(fetchedItems) {
        fetchedItems.forEach((item) => items.push(item));
    };
    if(itemFetchError) alert('Item Fetch Error');
    if(fetchedvendors) {
        fetchedvendors.forEach((vendor) => vendors.push(vendor));
    }
    if(vendorFetchError) alert('Vendor Fetch Error');
    const addItem = (e) => {
        e.preventDefault();
        const _id = Math.floor(Math.random() * 999999);
        let obj = {
            _id: _id,
            item: item,
            lot: lot,
            exp: exp,
            rate: rate,
            quantity: quantity,
            remove: <div style={{cursor: 'pointer', color: 'red'}} onClick={() => removeItem(_id)}>X</div>
        };
        let arr = itemInfo;
        arr.push(obj);
        setItemInfo(arr);
        clearItemForm();
    }
    const removeItem = (_id) => {
        let arr = itemInfo.slice();
        const updatedItems = arr.filter((item) => item._id !== _id);
        setItemInfo(updatedItems);
        console.log(itemInfo);
    }
    const clearItemForm = () => {
        setLot("");
        setExp("");
        setItem("");
        setQuantity("");
        setRate("");
    }
    return (
        <>
        <Form>
            <Form.Row>
                <Col xs={12}>
                <Form.Group>
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control required value={vendorName} onChange={(e) => setVendorName(e.target.value)} as="select">
                        <option disabled selected value=""> -- select a vendor -- </option>
                        {vendors.map((vendor, index) => <option key={index}>{vendor.name}</option>)}
                    </Form.Control>
                </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col xs={5}>
                    <Form.Label>Bill Number</Form.Label>
                    <Form.Control required value={billNo} onChange={(e) => setBillNo(e.target.value)} placeholder="Bill no." />
                </Col>
                <Col>
                    <Form.Label>Bill Date</Form.Label>
                    <Form.Control type="date" required value={billDate} onChange={(e) => setBillDate(e.target.value)} placeholder="Bill Date" />
                </Col>
                <Col>
                    <Form.Label>Receive Date</Form.Label>
                    <Form.Control type="date" required value={receiveDate} onChange={(e) => setReceiveDate(e.target.value)} placeholder="Receive Date" />
                </Col>
            </Form.Row>
            <hr style={{border: '1px dashed #eee'}} />
            <Table rows={itemTableRows} data={itemInfo}/>
        </Form>
        <Form onSubmit={addItem}>
            <Form.Row style={{ backgroundColor: '#eee', padding: '10px', border: '1px dashed #eee'}}>
                <Col xs={12}><Form.Group>
                    <Form.Label>Item</Form.Label>
                    <Form.Control required value={item} onChange={(e) => setItem(e.target.value)} as="select">
                        <option disabled selected value=""> -- select an item -- </option>
                        {items.map((item, index) => <option key={index}>{item.name}</option>)}
                    </Form.Control>
                </Form.Group></Col>
                <Col xs={3}>
                    <Form.Label>Lot Number</Form.Label>
                    <Form.Control value={lot} onChange={(e) => setLot(e.target.value)} placeholder="Lot" />
                </Col>
                <Col xs={3}>
                    <Form.Label>Expiry</Form.Label>
                    <Form.Control value={exp} onChange={(e) => setExp(e.target.value)} type="date" placeholder="Exp" />
                </Col>
                <Col xs={3}>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control required type="number" min="1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="rate" />
                </Col>
                <Col xs={3}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control required type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="quantity" />
                </Col>
                <Col style={{textAlign: 'center', marginTop: '10px'}}>
                    <Button size='sm' type="submit" variant="success">Add Item</Button>
                </Col>
            </Form.Row>
        </Form>
        </>
    );
}

export default PurchaseForm;