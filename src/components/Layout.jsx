import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

function Layout() {
    return (
        <>
            <Header />
            <main className="admin-main container">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;