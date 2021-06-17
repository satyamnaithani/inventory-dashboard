import Head from 'next/head';
import { NavBar, Menu, StockTable } from '../components';
import { server, company } from '../config';

const Stock = ({ data }) => {
  return (
    <div>
        <Head><title>{`${company.name}-Stock`}</title></Head>
        <NavBar />
        <div className='flex'>
            <Menu />
            <StockTable stock={data}/>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
    const url = `${server}stock`;
    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } }
}

export default Stock;