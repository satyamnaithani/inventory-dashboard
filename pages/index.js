import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu, NavBar } from '../components';
import { company } from '../config';
const Home = () => {
  return (
    <div className={styles.container}>
        <Head>
			<title>{`${company.name}-Dashboard`}</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
        </Head>
		<NavBar />
        <div className='flex'>
			<Menu />
			<div>hi</div>
        </div>
    </div>
  )
}
export default Home;