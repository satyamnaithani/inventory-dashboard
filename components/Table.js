import { Table as BootstrapTable } from 'react-bootstrap';

const Table = ({ data, rows}) => {
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
    let column = [];
    Object.keys(item).forEach((key) => {
        if(key !== '_id') column.push(item[key]);
    });
    return <tr>{column.map((cell, index) => <td key={index}>{cell}</td>)}</tr>;
}

export default Table;