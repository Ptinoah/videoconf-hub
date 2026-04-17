const Search = ({onSearch, searchTerm}) => {
    return (
       <div className="search-section">
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <input className="search-input" placeholder="Rechercher" type="text" onChange={onSearch} />
                </div>
                <button className="search-button">Rechercher</button>
            </div>
            {searchTerm && (
                <p className="search-text">Recherche de : <strong>{searchTerm}</strong></p>
            )}
        </div>
    )
};

export default Search