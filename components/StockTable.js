import { Table, Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import styles from '../styles/Stock.module.css';
import { Dialog, Spinner } from '../components';
import Router from 'next/router';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const StockTable = ({ stock }) => {
    const [open, setOpen] = useState(false);
    const [itemArray, setItemArray] = useState([]);
    const [loading, setLoading] = useState(false);

    //Sales Form Details
    const dispatchThroughArr = ['Surface Transport', 'By Hand', 'By Air', 'By Train'];
    const termsOfDeliveryArr = ['Door', 'Railway Station', 'Courrier Center'];
    const [customer, setCustomer] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [challanNo, setChallanNo] = useState("");
    const [challanDate, setChallanDate] = useState("");
    const [orderNo, setOrderNo] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [ewbNo, setEwbNo] = useState("");
    const [ewbDate, setEwbDate] = useState("");
    const [dispatchDocNo, setDispatchDocNo] = useState("");
    const [dispatchDocDate, setDispatchDocDate] = useState("");
    const [dispatchThrough, setDispatchThrough] = useState(dispatchThroughArr[0]);
    const [termsOfDelivery, setTermsOfDelivery] = useState(termsOfDeliveryArr[0]);
    const [remark, setRemark] = useState("");
    const [destination, setDestination] = useState("");

    const handleChecked = (item, operation, selling_rate, checkout_qty) => {
        if(operation === 'add') {
            let tempArr = [...itemArray];
            item['selling_rate'] = selling_rate;
            item['checkout_qty'] = checkout_qty;
            tempArr.push(item);
            setItemArray(tempArr);
        }
        if(operation === 'remove') {
            let tempArr = [...itemArray];
            tempArr = tempArr.filter((obj) => obj._id !== item._id);
            setItemArray(tempArr);
        }
    }
    let customersList = [];
    const heading = ['Add','Item', 'Purchase', 'Lot', 'Exp', 'Rate', 'Quantity'];
    const { data: fetchedCustomers, error: customerFetchError } = useSWR('/api/customers', fetcher);
    if(customerFetchError) console.log(customerFetchError);
    if(fetchedCustomers) customersList = [...fetchedCustomers];
    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
        let customer_details = customersList.filter((customer_obj) => customer_obj.name === e.target.value)[0];
        setDestination(customer_details.address);
    }
    const handleSalesFormSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const customer_details = customersList.filter((val) => val.name === customer)[0];
        let items = [];
        itemArray.forEach((item_obj) => {
            let item = {
                purchase_item_id: item_obj._id,
                selling_rate: parseFloat(item_obj.selling_rate),
                checkout: parseFloat(item_obj.checkout_qty)
            }
            items.push(item);
        });
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "customer_id": customer_details._id,
                "invoice_date": invoiceDate, 
                "challan_no": challanNo, 
                "challan_date": challanDate, 
                "order_no": orderNo, 
                "order_date": orderDate, 
                "ewb_no": ewbNo, 
                "ewb_date": ewbDate, 
                "dispatch_doc_no": dispatchDocNo, 
                "dispatch_doc_date": dispatchDocDate, 
                "dispatch_through": dispatchThrough, 
                "terms_of_delivery": termsOfDelivery, 
                "remark": remark,
                "sale_items": items
            })
        }
        const response = await fetch('/api/sales', reqObj);
        if(response.status === 201) {
            setLoading(false);
            clearSaleForm();
            updateStock();
            setOpen(false);
            alert("Sale Added Successfully!");
        } else {
            setLoading(false);
            console.log(response);
        }
    }
    const clearSaleForm = () => {
        setItemArray([]);
        setCustomer("");
        setInvoiceDate("");
        setChallanNo("");
        setChallanDate("");
        setOrderNo("");
        setOrderDate("");
        setEwbNo("");
        setEwbDate("");
        setDispatchDocNo("");
        setDispatchDocDate("");
        setDispatchThrough(dispatchThroughArr[0]);
        setTermsOfDelivery(termsOfDeliveryArr[0]);setRemark("");
        setDestination("");
    }
    const updateStock = () => {
        Router.reload(window.location.pathname);
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>{heading.map((title, index) => <th key={index}>{title}</th>)}</tr>
                </thead>
                <tbody>
                    {stock.map((item, index) => <StockRow key={index} item={item} handleChecked={handleChecked}/>)}
                </tbody>
            </Table>
            <Button style={{position: 'fixed', bottom: '10px', left: '50vw'}} onClick={() => setOpen(true)}>+</Button>
            <Dialog title={'Add Further Sales Details'} show={open} handleClose={() => setOpen(!open)} size={'xl'}>
                <div>
                    <Form onSubmit={handleSalesFormSubmit}>
                        <Form.Row>
                            <Col xs={8}>
                            <Form.Group>
                                <Form.Label>Customer</Form.Label>
                                <Form.Control required value={customer} onChange={handleCustomerChange} defaultValue={""} as="select">
                                    <option value="" disabled> -- select a customer -- </option>
                                    {customersList.map((customer_obj, index) => <option key={index}>{customer_obj.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Label>Invoice Date</Form.Label>
                                <Form.Control type="date" required value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} placeholder="dd-mm-yyyy"  />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>ChallanNo</Form.Label>
                                <Form.Control value={challanNo} onChange={(e) => setChallanNo(e.target.value)} placeholder="Challan No" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Challan Date</Form.Label>
                                <Form.Control type="date" value={challanDate} onChange={(e) => setChallanDate(e.target.value)} placeholder="Challan Date" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>OrderNo</Form.Label>
                                <Form.Control value={orderNo} onChange={(e) => setOrderNo(e.target.value)} placeholder="Order No" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Order Date</Form.Label>
                                <Form.Control type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} placeholder="Order Date" />
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>EWB No</Form.Label>
                                <Form.Control value={ewbNo} onChange={(e) => setEwbNo(e.target.value)} placeholder="EWB No" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>EWB Date</Form.Label>
                                <Form.Control type="date" value={ewbDate} onChange={(e) => setEwbDate(e.target.value)} placeholder="EWB Date" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>OrderNo</Form.Label>
                                <Form.Control value={dispatchDocNo} onChange={(e) => setDispatchDocNo(e.target.value)} placeholder="Dispatch Doc No" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Dispatch Doc Date</Form.Label>
                                <Form.Control type="date" value={dispatchDocDate} onChange={(e) => setDispatchDocDate(e.target.value)} placeholder="Dispatch Date" />
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control required disabled value={destination} placeholder="Destination" />
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Dispatch Through</Form.Label>
                                <Form.Control required value={dispatchThrough} placeholder="Dispatch Through" onChange={(e) => setDispatchThrough(e.target.value)} defaultValue={dispatchThroughArr[0]} as="select">
                                    {dispatchThroughArr.map((val, index) => <option key={index}>{val}</option>)}
                                </Form.Control>
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Terms of Delivery</Form.Label>
                                    <Form.Control required value={termsOfDelivery} placeholder="Terms of Delivery" onChange={(e) => setTermsOfDelivery(e.target.value)} defaultValue={termsOfDeliveryArr[0]} as="select">
                                        {termsOfDeliveryArr.map((val, index) => <option key={index}>{val}</option>)}
                                    </Form.Control>
                            </Col>
                            <Col xs={3}>
                                <Form.Label>Remark</Form.Label>
                                <Form.Control type="text" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark" />
                            </Col>
                        </Form.Row>
                        <br/>
                        <SalesItemTable data={itemArray}/>
                        <Total itemInfo={itemArray}/>
                        <Button type="submit" variant="success" block>{loading ? <Spinner /> : 'Confirm'}</Button>
                    </Form>
                </div>
            </Dialog>
        </>
    );
}
const Total = ({itemInfo}) => {
    let rate = 0, gst_value = 0;
    itemInfo.forEach((item) => {
        let total_rate = item.selling_rate * item.checkout_qty;
        rate += total_rate;
        gst_value += total_rate*(item.gst/100);
    });
    return (
        <div style={{border: '1px solid #eee', height: '100px', width: '250px', float: 'right', fontWeight: 'bold', padding: '5px', margin: '10px'}}>
            <div><span style={{float: 'left'}}>Total Rate:</span><span style={{float: 'right'}}>{`₹${rate.toFixed(2)}`}</span></div><br/>
            <div><span style={{float: 'left'}}>Total GST:</span><span style={{float: 'right'}}>{`₹${gst_value.toFixed(2)}`}</span></div><br/>
            <div><span style={{float: 'left'}}>Grand Total:</span><span style={{float: 'right'}}>{`₹${(rate + gst_value).toFixed(2)}`}</span></div><br/>
        </div>
    );
}
const StockRow = ({item, handleChecked}) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState();
    const [sellingRate, setSellingRate] = useState("");
    const [checkout, setCheckout] = useState("");
    const { item: item_name, vendor, lot_no, exp, quantity, initial_quantity, rate } = item;
    const handleCheck = (e) => {
        e.preventDefault();
        setChecked(!checked);
        setOpen(!open);
        if(!checked) handleChecked(item, 'add', sellingRate, checkout);
    }
    const handleRow = () => {
        if(checked) {
            setChecked(false);
            handleChecked(item, 'remove');
        }
        else setOpen(!open);
    }
    return (
        <>
            <tr style={checked ? {backgroundColor: 'pink'} : {}} onClick={handleRow}>
                <td></td>
                <td>{item_name}</td>
                <td>{vendor}</td>
                <td>{lot_no}</td>
                <td>{exp}</td>
                <td>{rate}</td>
                <td>{`${quantity}/${initial_quantity}`}</td>
            </tr>
            <Dialog title={item_name} show={open} handleClose={() => setOpen(!open)}>
                <Form onSubmit={handleCheck}>
                    <Form.Group>
                        <Form.Label>{`Selling Rate (Purchased at ₹${rate})`}</Form.Label>
                        <Form.Control required type="number" value={sellingRate} onChange={(e) => setSellingRate(e.target.value)} placeholder="Enter selling price" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control required type="number" value={checkout} onChange={(e) => setCheckout(e.target.value)} placeholder="Enter Quantity" />
                    </Form.Group>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button variant="danger" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="success" type="sumbit">Confirm</Button>
                    </div>
                </Form>
            </Dialog>
        </>
    );
}

const SalesItemTable = ({data}) => {
    const heading = ['SL.', 'CODE', 'ITEM', 'HSN/SAC', 'RATE', 'QTY', 'SUB TOTAL', 'GST', 'IGST', 'SGST', 'CGST', 'AMOUNT'];
    return (
        <div style={{overflowX: 'scroll'}}>
            <Table bordered style={{ fontSize: '15px', overflow: 'scroll'}}>
                <thead>
                    <tr>{heading.map((title, index) => <th key={index}>{title}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map((item, index) => <SalesItemTableRow key={index} serial_no={++index} item={item}/>)}
                </tbody>
            </Table>
        </div>
    );
}

const SalesItemTableRow = ({item, serial_no}) => {
    const {exp, gst, item: item_name, rate: purchase_rate, lot_no, code, hsn, selling_rate, checkout_qty} = item;
    const total_rate = selling_rate * checkout_qty;
    const calcGst = () => {
        let interstate = false;
        let gst_value = total_rate*(gst/100);

        if(interstate) return gst_value.toFixed(2);
        else return (gst_value/2).toFixed(2);
    }
    const calcGrandTotal = () => {
        let grand_total = total_rate + parseFloat(calcGst())*2;
        return grand_total.toFixed(2);
    }
    return (
        <tr>
            <td>{serial_no}.</td>
            <td>{code}</td>
            <td>
                <div style={{lineHeight: '1'}}>
                    <span><strong>{item_name}</strong></span><br/>
                    <span>{`Lot no: ${lot_no}`}</span><br/>
                    <span>{`Exp: ${exp}`}</span>
                </div>
            </td>
            <td>{hsn}</td>
            <td>{selling_rate}</td>
            <td>{checkout_qty}</td>
            <td>{selling_rate * checkout_qty}</td>
            <td>{gst}</td>
            <td>{calcGst()}</td>
            <td>{calcGst()}</td>
            <td>{calcGst()}</td>
            <td>{calcGrandTotal()}</td>
        </tr>
    );
}

export default StockTable;