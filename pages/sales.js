import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { useGetData } from '../config/fetchApi';

const Sales = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const { data, error } = useGetData("sales");
    if(error) return console.log(error);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Sales`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <Table data={data} rows={rows}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Sales;