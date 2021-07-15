import Head from 'next/head';
import { NavBar, Menu, StockTable } from '../components';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const Stock = () => {
  const { data, error } = useSWR('/api/stock', fetcher);
  if(error) console.log(error);
  return (
    <div>
        <Head><title>{`${process.env.COMPANY_NAME}-Stock`}</title></Head>
        <NavBar />
        <div className='flex'>
            <Menu />
            {data !== undefined ? <StockTable stock={data}/> : 'Loading...'}
        </div>
    </div>
  )
}

export default Stock;