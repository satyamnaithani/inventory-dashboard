import { Table, Form, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useRef } from 'react';
import styles from '../styles/Stock.module.css';
import { Dialog } from '../components';

const StockTable = ({ stock }) => {
    const [open, setOpen] = useState(false);
    const [itemArray, setItemArray] = useState([]);
    const handleChecked = (item, operation) => {
        if(operation === 'add') {
            let tempArr = [...itemArray];
            tempArr.push(item);
            setItemArray(tempArr);
        }
        if(operation === 'remove') {
            let tempArr = [...itemArray];
            tempArr = tempArr.filter((obj) => obj._id !== item._id);
            setItemArray(tempArr);
        }
    }
    const handleOpenSalesForm = () => {
        setOpen(!open);
    }
    const heading = ['Add','Item', 'Purchase', 'Lot', 'Exp', 'Rate', 'Quantity'];
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    {heading.map((title, index) => <th key={index}>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {stock.map((item, index) => <StockRow key={index} item={item} handleChecked={handleChecked}/>)}
                </tbody>
                <Button style={{position: 'fixed', bottom: '10px', left: '50vw'}} onClick={handleOpenSalesForm}>+</Button>
            </Table>
            <Dialog title={'Add Further Sales Details'} show={open} handleClose={() => setOpen(!open)} size={'xl'}>
                <div><SalesItemTable data={itemArray}/></div>
            </Dialog>
        </>
    );
}

const StockRow = ({item, handleChecked}) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState();
    const { _id, item: item_name, vendor, lot_no, exp, quantity, initial_quantity, rate} = item;
    const handleCheck = () => {
        setChecked(!checked);
        setOpen(!open);
        console.log(checked)
        if(!checked) handleChecked(item, 'add');
        else handleChecked(item, 'remove');
    }
    return (
        <>
            <tr style={checked ? {backgroundColor: 'pink'} : {}} onClick={handleCheck}>
                <td></td>
                <td>{item_name}</td>
                <td>{vendor}</td>
                <td>{lot_no}</td>
                <td>{exp}</td>
                <td>{rate}</td>
                <td>{`${quantity}/${initial_quantity}`}</td>
            </tr>
            <Dialog show={open} handleClose={() => setOpen(!open)}/>
        </>
    );
}

const SalesItemTable = ({data}) => {
    const heading = ['SL.', 'CODE', 'ITEM', 'HSN/SAC', 'RATE', 'QTY', 'SUB TOTAL', 'GST', 'IGST', 'SGST', 'CGST', 'AMOUNT'];
    return (
        <div>
            <Table bordered style={{tableLayout: 'fixed', fontSize: '15px'}}>
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
const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
const SalesItemTableRow = ({item, serial_no}) => {
    const {exp, gst, item: item_name, rate: purchase_rate, lot_no, code, hsn} = item;
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");
    const handleQuantity = (e) => {
        if(isNumeric(e.target.value)) setQuantity(parseFloat(e.target.value));
        else {
            setQuantity("");
            return;
        }
    }
    const handleRate = (e) => {
        if(isNumeric(e.target.value)) setRate(parseFloat(e.target.value));
        else {
            setRate("");
            return;
        }
        
    }
    return (
        <tr >
            <td>{serial_no}.</td>
            <td>{code}</td>
            <td><strong>{item_name}</strong></td>
            <td>{hsn}</td>
            <td>
                <InputGroup size="sm" >
                    <FormControl value={rate} onChange={handleRate} />
                    <span><span style={{fontSize: '8px'}}>Purchase Rate:</span> {purchase_rate}</span>
                </InputGroup>
            </td>
            <td>
                <InputGroup size="sm" className="mb-3">
                    <FormControl  value={quantity} onChange={handleQuantity} />
                </InputGroup>
            </td>
            <td>{rate * quantity}</td>
            <td>{gst}</td>
            <td>0</td>
            <td>{((rate * quantity)*(gst/100))/2}</td>
            <td>{((rate * quantity)*(gst/100))/2}</td>
            <td>{(rate * quantity)+((rate * quantity)*(gst/100))}</td>
        </tr>
    );
}

export default StockTable;