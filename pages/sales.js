import Head from 'next/head';
import { NavBar, Menu, SalesTable } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const Sales = () => {
    const { data, error } = useSWR('/api/sales', fetcher);
    if(error) console.log(error);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Sales`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <SalesTable data={data}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Sales;