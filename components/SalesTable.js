import { Table as BootstrapTable } from 'react-bootstrap';
import { Dialog } from '../components';
import { useState } from 'react';
import axios from 'axios';
import { saveAs } from "file-saver";

const SalesTable = ({ data }) => {
    const rows = ["invoice_no", "invoice_date", "customer_name", "item_list", "Status"];
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
    const {invoice_no, invoice_date, customer_name, item_list } = item;
    const [open, setOpen ] = useState(false);
    return (
        <>
        <tr style={{cursor: 'pointer'}} onClick={() => setOpen(true)}>
            <td>{invoice_no}</td>
            <td>{invoice_date}</td>
            <td>{customer_name}</td>
            <td><ItemList list={item_list}/></td>
            <td></td>
        </tr>
        <Dialog title={'Sales Details'} show={open} handleClose={() => setOpen(false)}><SaleDetails item={item}/></Dialog>
        </>
    );
}

const ItemList = ({list}) => {
    return (
        <>
        {list !== undefined ? list.map((obj, index) => {
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
const handleDownloadPdf = (item) => {
    let pdfData = item;
    // let pdfData = {};
    // pdfData['method'] = 'POST';
    // pdfData['body'] = JSON.stringify(item);
    // fetch('/api/invoice', pdfData).then((result) => {
    //     console.log(result);
    //     const pdfBlob = new Blob([result.data], { type: "application/pdf" });
    //     saveAs(pdfBlob, pdfData.invoice_no + ".pdf");
    // })
    
    axios.post(`${process.env.SERVER_URL}invoice/create-pdf`, pdfData)
    .then(() => axios.get(`${process.env.SERVER_URL}invoice/fetch-pdf`, { responseType: "blob" }))
    .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, pdfData.invoice_no + ".pdf");
    })
    .catch((err) => console.log(err));
};
const SaleDetails = ({ item }) => {
    const {invoice_no, invoice_date, customer_name, challan_no, challan_date, order_no, order_date, ewb_no, ewb_date, dispatch_doc_no, dispatch_doc_date, dispatch_through, terms_of_delivery, remark } = item;
    return(
        <div>
            <button onClick={() => handleDownloadPdf(item)}>download</button>
            <p>{invoice_no}</p>
            <p>{invoice_date}</p>
            <p>{customer_name}</p>
            <p>{challan_no}</p>
            <p>{challan_date}</p>
            <p>{order_no}</p>
            <p>{dispatch_through}</p>
            <p>{remark}</p>
        </div>
    );
}

export default SalesTable;