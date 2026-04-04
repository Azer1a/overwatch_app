import React from 'react';
import Header from './components/common/Header';
import Main from './components/common/Main';
import Footer from './components/common/Footer';
import CounterPickPage from './pages/CounterPickPage';
import SynergyPickPage from './pages/SynergyPage';
import MapPickPage from './pages/MapPickPage';
import './styles/BaseStyle.scss';

function App(){
    const [currentPage, setCurrentPage] = React.useState('main');
    const navigate = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='app'>
            <Header navigate={navigate} currentPage={currentPage} />
            <main className='main-content'>
                {currentPage === 'main' && <Main />}
                {currentPage === 'counterpick' && <CounterPickPage />}
                {currentPage === 'synergy' && <SynergyPickPage />}
                {currentPage === 'maps' && <MapPickPage />}
            </main>
            <Footer />
        </div>
    );
}

export default App;