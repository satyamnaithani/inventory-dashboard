import { Table } from 'react-bootstrap';

const StockTable = ({ stock }) => {
    const heading = ['Item', 'Purchase', 'Lot', 'Exp', 'Rate', 'Quantity'];
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                {heading.map((title, index) => <th key={index}>{title}</th>)}
                </tr>
            </thead>
            <tbody>
                {stock.map((item, index) => <StockRow key={index} item={item}/>)}
            </tbody>
        </Table>
    );
}

const StockRow = ({item}) => {
    const { item_id, purchase_id, lot_no, exp, quantity, initial_quantity, rate} = item;
    return (
        <tr>
            <td>{item_id}</td>
            <td>{purchase_id}</td>
            <td>{lot_no}</td>
            <td>{exp}</td>
            <td>{rate}</td>
            <td>{`${quantity}/${initial_quantity}`}</td>
        </tr>
    );
}

export default StockTable;