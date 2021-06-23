import Head from 'next/head';
import { NavBar, Menu } from '../components';
import { server, company } from '../config';

const Sales = () => {
    return (
        <div>
            <Head><title>{`${company.name}-Sales`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
            </div>
        </div>
    );
}

export default Sales;