import { useNavigate } from 'react-router-dom';
import { useWatchLater } from './Context/WatchLaterContext';

const Header = ({myLogo}) => {
    const navigate = useNavigate();
    const { watchLaterList } = useWatchLater();
    const itemsCount = Object.keys(watchLaterList).length;

    return (
        <header className="navbar">
            <div className="logo-section" onClick={() => navigate('/')}>
                <img src={myLogo} alt="Logo" id="logo"/>
                <span className="logo-text">VideoConf Hub</span>
            </div>
           <button className="btn-search" onClick={() => navigate('/search/')}>Search</button>
           
           <button className="btn-watchlist" onClick={() => navigate('/watchlist/')}>
                Watchlist
                {itemsCount > 0 && (
                    <span className="watchlist-count-badge">{itemsCount}</span>
                )}
           </button>
        </header>
    );
};

export default Header;