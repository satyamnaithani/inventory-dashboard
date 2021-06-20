import { Table, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Dialog } from '../components';
const StockTable = ({ stock }) => {
    const [heading] = useState(['Add','Item', 'Purchase', 'Lot', 'Exp', 'Rate', 'Quantity']);
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
            </Table>
            <Button style={{position: 'fixed', bottom: '10px', left: '50vw'}} onClick={() => setOpen(!open)}>+</Button>
            <Dialog size="xl" title={'Enter Further Details'} show={open} handleClose={() => setOpen(false)}>
                <SalesItemTable data={itemArray}/>
            </Dialog>
        </>
    );
}

const StockRow = ({item, handleChecked}) => {
    const [checked, setChecked] = useState(false);
    const { _id, item: item_name, vendor, lot_no, exp, quantity, initial_quantity, rate} = item;
    const handleCheck = (e) => {
        setChecked(e.target.checked);
        if(e.target.checked) handleChecked(item, 'add');
        else handleChecked(item, 'remove');
    }
    return (
        <tr>
            <td><Form.Check type="checkbox" id={_id} custom checked={checked} onChange={(e) => handleCheck(e)}/></td>
            <td>{item_name}</td>
            <td>{vendor}</td>
            <td>{lot_no}</td>
            <td>{exp}</td>
            <td>{rate}</td>
            <td>{`${quantity}/${initial_quantity}`}</td>
        </tr>
    );
}

const SalesItemTable = ({data}) => {
    const heading = ['SL.', 'CODE', 'ITEM', 'HSN/SAC', 'QTY', 'RATE', 'SUB TOTAL', 'GST', 'IGST', 'SGST', 'CGST', 'AMOUNT'];
    return (
        <Table bordered>
            <thead>
                <tr>{heading.map((title, index) => <th key={index}>{title}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((item, index) => <Row key={index} item={item}/>)}
            </tbody>
        </Table>
    );
}

const Row = ({item}) => {
    let column = [];
    Object.keys(item).forEach((key) => {
        if(key !== '_id' && key !== 'initial_quantity' && key !== 'quantity') column.push(item[key]);
    });
    return <tr>{column.map((cell, index) => <td key={index}>{cell}</td>)}</tr>;
}

export default StockTable;