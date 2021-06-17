import Head from 'next/head';
import { NavBar, Menu, Table } from '../components';
import { server, company } from '../config';

const Items = ({ data }) => {
    const rows = ['Code','Name', 'Category', 'HSN', 'GST', 'UOM' ];
    return (
        <div>
            <Head><title>{`${company.name}-Items`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
                <Table data={data} rows={rows}/>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const url = `${server}items`;
    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } }
}

export default Items;