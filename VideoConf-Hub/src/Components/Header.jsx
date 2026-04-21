import { useNavigate } from 'react-router-dom';

const Header = ({myLogo}) => {
    const navigate = useNavigate()
    return (
        <header className="navbar">
            <div className="logo-section" onClick={() => navigate('/')}>
                <img src={myLogo} alt="Logo" id="logo"/>
                <span className="logo-text">VideoConf Hub</span>
            </div>
           <button className="btn-search" onClick={() => navigate('/search/')}>Search</button>
        </header>
    )
};

export default Header
