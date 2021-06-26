import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { server, company } from '../config';
import { useGetData } from '../config/fetchApi';

const Items = () => {
    const rows = ['Code','Name', 'Category', 'HSN', 'GST', 'UOM' ];
    const { data: fetchedItems, error: itemFetchError } = useGetData("items");
    if(itemFetchError) console.error(itemFetchError);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Items`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {fetchedItems !== undefined ? <Table data={fetchedItems} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Items;