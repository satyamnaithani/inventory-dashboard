import Head from 'next/head';
import { NavBar, Menu } from '../components';
import { server, company } from '../config';

const Report = () => {
    return (
        <div>
            <Head><title>{`${company.name}-Report`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
            </div>
        </div>
    );
}

export default Report;