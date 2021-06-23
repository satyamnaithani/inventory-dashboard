import Head from 'next/head';
import { NavBar, Menu, StockTable } from '../components';
import { company } from '../config';
import { useGetData } from '../config/fetchApi';

const Stock = () => {
  const { data, error } = useGetData("stock");
  if(error) return console.log(error);
  return (
    <div>
        <Head><title>{`${company.name}-Stock`}</title></Head>
        <NavBar />
        <div className='flex'>
            <Menu />
            {data !== undefined ? <StockTable stock={data}/> : 'Loading...'}
        </div>
    </div>
  )
}

export default Stock;