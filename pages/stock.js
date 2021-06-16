import Head from 'next/head';
import styles from '../styles/Stock.module.css';
import { NavBar, Menu, Table } from '../components';

const Stock = ({ data }) => {
  const company = "Satvik Solutions";
  return (
    <div className={styles.container}>
        <Head><title>{`${company}-Stock`}</title></Head>
        <NavBar />
        <div className='flex'>
            <Menu />
            <Table stock={data}/>
        </div>
    </div>
  )
}

export async function getServerSideProps() {

    const res = await fetch(`https://nodejs-msql-backend.herokuapp.com/stock`);
    const data = await res.json();

    return { props: { data } }
}

export default Stock;