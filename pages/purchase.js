import Head from 'next/head';
import { NavBar, Menu } from '../components';
import { server, company } from '../config';

const Purchase = () => {
    return (
        <div>
            <Head><title>{`${company.name}-Purchase`}</title></Head>
            <NavBar />
            <div className='flex'>
                <Menu />
            </div>
        </div>
    );
}

export default Purchase;