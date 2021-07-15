import { Table as BootstrapTable } from 'react-bootstrap';
import { Dialog } from '../components';
import { useState } from 'react';

const PurchaseTable = ({ data }) => {
    const rows = ['Bill No', 'Bill Date', 'Vendor', 'Item List', 'Status'];
    return (
        <BootstrapTable bordered hover>
            <thead>
                <tr>{rows.map((title, index) => <th key={index}>{title}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((item, index) => <Row key={index} item={item}/>)}
            </tbody>
        </BootstrapTable>
    );
}

const Row = ({item}) => {
    const {bill_no, bill_date, vendor, interstate, item_list} = item;
    const [open, setOpen ] = useState(false);

    return (
        <>
        <tr style={{cursor: 'pointer'}} onClick={() => setOpen(true)}>
            <td>{bill_no}</td>
            <td>{bill_date}</td>
            <td>{vendor}</td>
            <td><ItemList list={JSON.parse(JSON.stringify(item_list))}/></td>
            <td></td>
        </tr>
        <Dialog title={'Purchase Details'} show={open} handleClose={() => setOpen(false)}>{bill_no}</Dialog>
        </>
    );
}

const ItemList = ({list}) => {
    let arr = list.split("},");
    return (
        <>
        {arr !== undefined ? arr.map((data, index) => {
            let x = "";
            if(data.substring(data.length-1) !== '}') data += "}"
            let obj = JSON.parse(data);
                return (
                    <div key={index}>
                        <div><span style={{float: 'left'}}>{obj.name}</span></div>
                        <div><span style={{float: 'right'}}>{obj.quantity}</span></div><br/>
                    </div>
                );
            }) : ''}
        </>
    );
}
export default PurchaseTable;