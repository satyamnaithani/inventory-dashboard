import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { server, company } from '../config';

const Customers = ({ data }) => {
    const rows = ['Code','Name', 'Address', 'GST', 'DL', 'Contact', 'Person' ];
    return (
        <div>
            <Head><title>{`${company.name}-Customers`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                <Table data={data} rows={rows}/>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const url = `${server}customers`;
    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } }
}

export default Customers;