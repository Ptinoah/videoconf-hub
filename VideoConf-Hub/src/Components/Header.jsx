import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchLater } from './Context/WatchLaterContext';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase/Authentification'; 

const Header = ({myLogo}) => {
    const navigate = useNavigate();
    const { watchLaterList } = useWatchLater();
    const itemsCount = Object.keys(watchLaterList).length;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const menuRef = useRef(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setIsMenuOpen(false);
            console.log("Utilisateur déconnecté");
        }).catch((error) => {
            console.error("Erreur lors de la déconnexion", error);
        });
    };

    return (
        <header className="navbar">
            <div className="logo-section" onClick={() => navigate('/')}>
                <img src={myLogo} alt="Logo" id="logo"/>
                <span className="logo-text">VideoConf Hub</span>
            </div>
            <button className="btn-search" onClick={() => navigate('/search/')}>Search</button>
            <div className="nav-actions">
                <button className="btn-watchlist" onClick={() => navigate('/watchlist/')}>
                    Watchlist
                    {itemsCount > 0 && (
                        <span className="watchlist-count-badge">{itemsCount}</span>
                    )}
                </button>

                <div className="account-section" ref={menuRef}>
                    <button className="btn-login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/user-male-circle--v1.png" alt="user-male-circle--v1"/>
                    </button>

                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            {currentUser ? (
                                <>
                                    <div className="dropdown-header">{currentUser.email}</div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={() => { setIsMenuOpen(false); navigate('/settings/'); }}>Settings</button>
                                    <button className="dropdown-item" onClick={handleSignOut}>Sign out</button>
                                </>
                            ) : (
                                <>
                                    <div className="dropdown-header">Anonyme</div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={() => { setIsMenuOpen(false); navigate('/settings/'); }}>Settings</button>
                                    <button className="dropdown-item" onClick={() => { setIsMenuOpen(false); navigate('/register/'); }}>Register</button>
                                    <button className="dropdown-item" onClick={() => { setIsMenuOpen(false); navigate('/login/'); }}>Sign In</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;