import { Nav } from 'react-bootstrap';
import Link from 'next/link';

const routes = [
    { link: '/', value: 'Home' },
    { link: '/', value: 'Report' },
    { link: '/stock', value: 'Stock' },
    { link: '/purchase', value: 'Purchase' },
    { link: '/', value: 'Sales' },
    { link: '/customers', value: 'Customers' },
    { link: '/vendors', value: 'Vendors' },
    { link: '/items', value: 'Item' },
];

const Menu = () => {
    return (
        <Nav defaultActiveKey="/home" style={styles.navbar} className="flex-column p">
            {routes.map((route, index) => (
                <Link href={route.link} key={index}><a><span style={{ color: '#fff', textDecoration: 'none'}}>{route.value}</span></a></Link>
            ))}
        </Nav>
    );
}

const styles = {
    navbar: {
        fontSize: '20px',
        minHeight: '100vh',
        padding: '10px', 
        backgroundColor: '#343a40'
    }
};
export default Menu;