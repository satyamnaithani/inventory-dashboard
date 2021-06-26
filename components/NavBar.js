import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { Dialog, PurchaseForm, ItemForm, VendorForm, CustomerForm } from '../components';
import Link from 'next/link';

const NavBar = () => {
	const [openPurchase, setOpenPurchase] = useState(false);
	const [openItem, setOpenItem] = useState(false);
	const [openCustomer, setOpenCustomer] = useState(false);
	const [openVendor, setOpenVendor] = useState(false);

    return (
		<>
        	<Navbar style={{ position: "sticky", fontSize: '18px' }} bg="dark" variant="dark" fixed="top">
				<Navbar.Brand className="mr-5" href="#">{process.env.COMPANY_NAME}</Navbar.Brand>
				<Nav className="ml-5">
					<NavDropdown title="Add">
						<NavDropdown.Item onClick={() => setOpenPurchase(!openPurchase)}>Purchase</NavDropdown.Item>
						<Link href={'/stock'}><a style={{textDecoration: 'none', color: '#212529', width: '100%', display: 'block',textAlign: 'inherit', fontSize: 'inherit', padding: '.25rem 1.5rem'}}>Sale</a></Link>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={() => setOpenVendor(!openVendor)}>Vendor</NavDropdown.Item>
						<NavDropdown.Item onClick={() => setOpenCustomer(!openCustomer)}>Customer</NavDropdown.Item>
						<NavDropdown.Item onClick={() => setOpenItem(!openItem)}>Item</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Dialog title={'Purchase Bill Entry'} size="xl" show={openPurchase} handleClose={() => setOpenPurchase(false)}><PurchaseForm /></Dialog>
				<Dialog title={'Vendor Registration'} show={openVendor} handleClose={() => setOpenVendor(false)}><VendorForm /></Dialog>
				<Dialog title={'Customer Registration'} show={openCustomer} handleClose={() => setOpenCustomer(false)}><CustomerForm/></Dialog>
				<Dialog title={'Item Registration'} show={openItem} handleClose={() => setOpenItem(false)}><ItemForm/></Dialog>
  			</Navbar>
		</>
    );
}

export default NavBar;