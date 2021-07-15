import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const Vendors = () => {
    const rows = ['Code','Name', 'Address', 'GST', 'DL', 'Contact', 'Person' ];
    const { data, error } = useSWR('/api/vendors', fetcher);
    if(error) console.log(error);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Vendors`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <Table data={data} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Vendors;