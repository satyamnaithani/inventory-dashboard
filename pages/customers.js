import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { useGetData } from '../config/fetchApi';

const Customers = () => {
    const rows = ['Code','Name', 'Address', 'GST', 'DL', 'Contact', 'Person' ];
    const { data: fetchedCustomers, error: customerFetchError } = useGetData("customers");
    if(customerFetchError) console.error(customerFetchError);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Customers`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {fetchedCustomers !== undefined ? <Table data={fetchedCustomers} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Customers;