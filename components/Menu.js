import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

let routes = [
    { link: '/', value: 'Home' },
    { link: '/report', value: 'Report' },
    { link: '/stock', value: 'Stock' },
    { link: '/purchase', value: 'Purchase' },
    { link: '/sales', value: 'Sales' },
    { link: '/customers', value: 'Customers' },
    { link: '/vendors', value: 'Vendors' },
    { link: '/items', value: 'Item' },
];

const Menu = () => {
    const router = useRouter();
    return (
        <Nav defaultActiveKey="/home" style={styles.navbar} className="flex-column">
            <span style={{position: 'fixed', width: '10vw'}}>
                {routes.map((route, index) => (
                    <p key={index} className="menu_item" style={router.route === route.link ? {backgroundColor: '#8080ff'} : {}}>
                        <Link href={route.link}><a style={{textDecoration: 'none', display: 'block'}}>
                            <span style={{ color: '#fff', textDecoration: 'none', padding: '10px', display: 'block'}}>{route.value}</span>
                        </a></Link>
                    </p>
                ))}
            </span>
        </Nav>
    );
}

const styles = {
    navbar: {
        fontSize: '20px',
        minHeight: '100vh',
        minWidth: '10vw',
        //padding: '10px', 
        backgroundColor: '#343a40',
        //position: 'relative'
    }
};
export default Menu;