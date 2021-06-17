import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { company } from '../config';
import { useState } from 'react';
import { Dialog } from '../components';

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
    return (
		<>
        	<Navbar style={{ position: "sticky" }} bg="dark" variant="dark" fixed="top">
				<Navbar.Brand href="#home">{company.name}</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					<NavDropdown title="Add">
						<NavDropdown.Item onClick={() => setOpen(!open)}>Purchase</NavDropdown.Item>
						<NavDropdown.Item>Sale</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>Vendor</NavDropdown.Item>
						<NavDropdown.Item>Customer</NavDropdown.Item>
						<NavDropdown.Item>Item</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Dialog show={open} handleClose={handleClose} />
  			</Navbar>
		</>
    );
}

export default NavBar;