import { Table, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

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
            {open ? <SalesItemTable handleOpenSalesForm={handleOpenSalesForm} data={itemArray}/> : 
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
            </Table>}
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

const SalesItemTable = ({data, handleOpenSalesForm}) => {
    const heading = ['SL.', 'CODE', 'ITEM', 'HSN/SAC', 'QTY', 'RATE', 'SUB TOTAL', 'GST', 'IGST', 'SGST', 'CGST', 'AMOUNT'];
    console.log(data)
    return (
        <div style={{width: '100%'}}>
            <Button onClick={handleOpenSalesForm} style={{float: 'left'}}>{'<---'}</Button>
            <h4>Add Further Details</h4>
            <Table bordered>
                <thead>
                    <tr>{heading.map((title, index) => <th key={index}>{title}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const {exp, gst, item: item_name, lot_no, rate} = item;
                        return (
                        <tr key={index}>
                            <td>{item_name}</td>
                            <td>{lot_no}</td>
                            <td>{exp}</td>
                            <td>{gst}</td>
                            <td>{rate}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default StockTable;