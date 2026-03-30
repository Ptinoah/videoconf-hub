const Header = ({Search, myLogo, handleHomeClick, handleSearch, currentSearch}) => {
    return (
        <header className="navbar">
            <div className="logo-section" onClick={handleHomeClick}>
                <img src={myLogo} alt="Logo" id="logo"/>
                <span className="logo-text">VideoConf Hub</span>
            </div>
            <Search onSearch={handleSearch} searchTerm={currentSearch}/>
        </header>
    )
}

export default Header
