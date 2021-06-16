import { Nav } from 'react-bootstrap';

const routes = [
    { link: '/', value: 'Home' },
    { link: '/', value: 'Report' },
    { link: '/stock', value: 'Stock' },
    { link: '/', value: 'Purchase' },
    { link: '/', value: 'Sales' },
    { link: '/', value: 'Customers' },
    { link: '/', value: 'Vendors' },
    { link: '/', value: 'Item' },
];

const Menu = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            {routes.map((route, index) => (
                <Nav.Link key={index} href={route.link} >{route.value}</Nav.Link>
            ))}
        </Nav>
    );
}

export default Menu;