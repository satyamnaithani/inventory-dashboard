import Head from 'next/head';
import { NavBar, Menu } from '../components';

const Report = () => {
    return (
        <div>
            <Head><title>{`${process.env.COMPANY_NAME}-Report`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
            </div>
        </div>
    );
}

export default Report;