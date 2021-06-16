import { Table } from 'react-bootstrap';

const StockTable = ({ stock }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Purchase</th>
                    <th>Lot</th>
                    <th>Exp</th>
                    <th>Rate</th>
                    <th>Quantity</th>
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