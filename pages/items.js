import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const Items = () => {
    const rows = ['Code','Name', 'Category', 'HSN', 'GST', 'UOM' ];
    const { data, error } = useSWR('/api/items', fetcher);
    if(error) console.log(error);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Items`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <Table data={data} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Items;