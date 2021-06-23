import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { server, company } from '../config';
import { useGetData } from '../config/fetchApi';

const Vendors = () => {
    const rows = ['Code','Name', 'Address', 'GST', 'DL', 'Contact', 'Person' ];
    const { data: fetchedVendors, error: vendorFetchError } = useGetData("vendors");
    if(vendorFetchError) console.error(vendorFetchError);
    return (
        <div>
            <Head><title>{`${company.name}-Vendors`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {fetchedVendors !== undefined ? <Table data={fetchedVendors} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Vendors;