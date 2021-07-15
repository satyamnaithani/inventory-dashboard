import Head from 'next/head';
import { NavBar, Menu, PurchaseTable } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const Purchase = () => {
    const { data, error } = useSWR('/api/purchase', fetcher);
    if(error) console.log(error);
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Purchase`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                {data !== undefined ? <PurchaseTable data={data}/> : 'Loading...'}
            </div>
        </div>
    );
}

export default Purchase;