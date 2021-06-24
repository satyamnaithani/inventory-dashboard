import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { company } from '../config';
import { useGetData } from '../config/fetchApi';

const Purchase = () => {
    const rows = ['Bill No','Bill Date', 'Receive Date', 'Vendor', 'City', 'Item List'];
    const { data, error } = useGetData("purchase");
    if(error) return console.log(error);
    return (
        <div>
            <Head><title>{`${company.name}-Purchase`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <Table data={data} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Purchase;