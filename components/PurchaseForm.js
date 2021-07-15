import { Form, Col, Button, Modal } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { Table, Spinner } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const PurchaseForm = () => {
    const [vendorName, setVendorName] = useState("");
    const [billNo, setBillNo] = useState("");
    const [billDate, setBillDate] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    const [openItemForm, setOpenItemForm] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [lot, setLot] = useState("");
    const [exp, setExp] = useState("");
    const [item, setItem] = useState("");
    const [rate, setRate] = useState("");
    const [quantity, setQuantity] = useState("");

    const [itemInfo, setItemInfo] = useState([]);
    const [itemTableRows] = useState(['Item', 'lot', 'Exp', 'rate', 'GST', 'quantity', 'Remove']);
    const [loading, setLoading] = useState(false);

    const itemArray = useRef();
    itemArray.current = itemInfo;

    const { data: fetchedItems, error: itemFetchError } = useSWR('/api/items', fetcher);
    const { data: fetchedVendors, error: vendorFetchError } = useSWR('/api/vendors', fetcher);
    let items = [], vendors = [];

    if(fetchedItems) items = [...fetchedItems];
    if(itemFetchError) console.log('Item Fetch Error');
    if(fetchedVendors) vendors = [...fetchedVendors];
    if(vendorFetchError) console.log('Vendor Fetch Error');
    const addItem = (e) => {
        e.preventDefault();
        const key = Math.floor(Math.random() * 999999);
        const itemObj = items.filter((obj) => obj.name === item)[0];

        let obj = {
            key: key,
            item_id: itemObj._id,
            item: item,
            lot_no: lot,
            exp: exp,
            rate: rate,
            gst: itemObj.gst,
            quantity: quantity,
            remove: <div style={{cursor: 'pointer', color: 'red'}} onClick={() => removeItem(key)}>X</div>
        };
        let arr = itemInfo;
        arr.push(obj);
        if(arr.length > 0) setButtonDisabled(false);
        setItemInfo(arr);
        clearItemForm();
    }
    const removeItem = key => {
        let arr = [...itemArray.current];
        const updatedItems = arr.filter((item_obj) => item_obj.key !== key);
        if(updatedItems.length === 0) setButtonDisabled(true);
        setItemInfo([...updatedItems]);
    }
    const clearItemForm = () => {
        setLot("");setExp("");setItem("");setQuantity("");setRate("");
    }
    const clearPurchaseForm = () => {
        setVendorName("");setBillNo("");setBillDate("");setReceiveDate("");setItemInfo([]);
    }
    const handlePurchaseForm = async(e) => {
        e.preventDefault();
        setLoading(true);
        const {_id: vendor_id} = vendors.filter((vendor) => vendor.name === vendorName)[0];
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                vendor_id: vendor_id,
                bill_no: billNo,
                bill_date: billDate,
                receive_date: receiveDate,
                items: itemInfo
            })
        }
        const response = await fetch('/api/purchase', reqObj);
        if(response.status === 201) {
            setLoading(false);
            clearPurchaseForm();
            alert("Purchase Added Successfully!");
        } else {
            setLoading(false);
            console.log(response);
        }
    }
    return (
        <>
            <Form onSubmit={handlePurchaseForm}>
                <Form.Row>
                    <Col xs={12}>
                    <Form.Group>
                        <Form.Label>Vendor</Form.Label>
                        <Form.Control required value={vendorName} onChange={(e) => setVendorName(e.target.value)} defaultValue={""} as="select">
                            <option value="" disabled> -- select a vendor -- </option>
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
                <br />
                <Button style={{float: 'right', margin: '5px'}} size='sm' onClick={() => setOpenItemForm(!openItemForm)} variant="success">+ Add Item</Button>
                {itemInfo.length === 0 ? <SelectItems />: <Table rows={itemTableRows} data={itemInfo}/>}
                <Total itemInfo={itemInfo}/>
                <Button style={{float: 'right', margin: '25px', width: '300px'}} disabled={buttonDisabled} variant="success" type="submit">{loading ? <Spinner /> : 'Add'}</Button>
            </Form>
            <Dialog show={openItemForm} handleClose={() => setOpenItemForm(false)}>
                <Form onSubmit={addItem}>
                    <Form.Row style={{ backgroundColor: '#eee', padding: '10px', border: '1px dashed #eee'}}>
                        <Col xs={12}><Form.Group>
                            <Form.Label>Item</Form.Label>
                            <Form.Control required value={item} onChange={(e) => setItem(e.target.value)} defaultValue={""} as="select">
                            <option value="" disabled> -- select an item -- </option>
                                {items.map((item, index) => <option key={index}>{item.name}</option>)}
                            </Form.Control>
                        </Form.Group></Col>
                        <Col xs={6}>
                            <Form.Label>Lot Number</Form.Label>
                            <Form.Control value={lot} onChange={(e) => setLot(e.target.value)} placeholder="Lot" />
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Expiry</Form.Label>
                            <Form.Control value={exp} onChange={(e) => setExp(e.target.value)} type="date" placeholder="Exp" />
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Rate</Form.Label>
                            <Form.Control required type="number" min="1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} placeholder="rate" />
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control required type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} placeholder="quantity" />
                        </Col>
                        <Col style={{textAlign: 'center', marginTop: '10px', display: 'flex', justifyContent: 'space-evenly'}}>
                            <Button size='sm' onClick={() => setOpenItemForm(false)} variant="danger">Cancel</Button>
                            <Button size='sm' type="submit" variant="success">+ Add More</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Dialog>
        </>
    );
}

const Dialog = ({ show, handleClose, children }) => {
    return (
        <Modal animation={false} show={show} centered onHide={handleClose} size="md">
            <Modal.Header closeButton><Modal.Title>{"Add Item"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}

const Total = ({itemInfo}) => {
    let rate = 0, gst_value = 0;
    itemInfo.forEach((item) => {
        let total_rate = item.rate * item.quantity;
        rate += total_rate;
        gst_value += total_rate*(item.gst/100);
    });
    return (
        <div style={{border: '1px solid #eee', height: '100px', width: '250px', float: 'right', fontWeight: 'bold', padding: '5px'}}>
            <div><span style={{float: 'left'}}>Total Rate:</span><span style={{float: 'right'}}>{`₹${rate.toFixed(2)}`}</span></div><br/>
            <div><span style={{float: 'left'}}>Total GST:</span><span style={{float: 'right'}}>{`₹${gst_value.toFixed(2)}`}</span></div><br/>
            <div><span style={{float: 'left'}}>Grand Total:</span><span style={{float: 'right'}}>{`₹${(rate + gst_value).toFixed(2)}`}</span></div><br/>
        </div>
    );
}

const SelectItems = () => {
    return (
        <div style={{height: '100px', width: 'inherit', border: '2px dashed #eee', color: '#dedede', textAlign: 'center', fontSize: '20px'}}>
            <p style={{marginTop: '25px'}}>Please Add Items to the Bill.</p>
        </div>
    );
}

export default PurchaseForm;