import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { company } from '../config';
import { useState } from 'react';
import { Dialog, PurchaseForm } from '../components';
import Link from 'next/link';

const NavBar = () => {
	const [openPurchase, setOpenPurchase] = useState(false);
	const [openItem, setOpenItem] = useState(false);
	const [openCustomer, setOpenCustomer] = useState(false);
	const [openVendor, setOpenVendor] = useState(false);

    return (
		<>
        	<Navbar style={{ position: "sticky" }} bg="dark" variant="dark" fixed="top">
				<Navbar.Brand href="#home">{company.name}</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					<NavDropdown title="Add">
						<NavDropdown.Item onClick={() => setOpenPurchase(!openPurchase)}>Purchase</NavDropdown.Item>
						<Link href={'/stock'}><a style={{textDecoration: 'none', color: 'black', textAlign: 'center', fontSize: 'inherit'}}>Sale</a></Link>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={() => setOpenVendor(!openVendor)}>Vendor</NavDropdown.Item>
						<NavDropdown.Item onClick={() => setOpenCustomer(!openCustomer)}>Customer</NavDropdown.Item>
						<NavDropdown.Item onClick={() => setOpenItem(!openItem)}>Item</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Dialog title={'Purchase Bill Entry'} size="xl" show={openPurchase} handleClose={() => setOpenPurchase(false)}><PurchaseForm /></Dialog>
				<Dialog title={'Vendor Registration'} show={openVendor} handleClose={() => setOpenVendor(false)}>Vendor</Dialog>
				<Dialog title={'Customer Registration'} show={openCustomer} handleClose={() => setOpenCustomer(false)}>Customer</Dialog>
				<Dialog title={'Item Registration'} show={openItem} handleClose={() => setOpenItem(false)}>Item</Dialog>
  			</Navbar>
		</>
    );
}

export default NavBar;