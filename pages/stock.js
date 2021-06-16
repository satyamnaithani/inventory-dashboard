import Head from 'next/head';
import styles from '../styles/Stock.module.css';
import { NavBar, Menu, Table } from '../components';

const Stock = ({ data }) => {
  const company = "Satvik Solutions";
  return (
    <div className={styles.container}>
        <Head><title>{`${company}-Stock`}</title></Head>
        <NavBar />
        <div className={styles.flex}>
            <Menu />
            <Table stock={data}/>
        </div>
      
    </div>
  )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://nodejs-msql-backend.herokuapp.com/stock`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

export default Stock;