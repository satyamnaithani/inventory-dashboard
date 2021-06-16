import Head from 'next/head';
import styles from '../styles/Stock.module.css';
import { NavBar, Menu, Table } from '../components';

const Stock = () => {
  const company = "Satvik Solutions";
  return (
    <div className={styles.container}>
        <Head><title>{`${company}-Stock`}</title></Head>
        <NavBar />
        <div className={styles.flex}>
            <Menu />
            <Table />
        </div>
      
    </div>
  )
}
export default Stock;