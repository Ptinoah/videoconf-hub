const Search = ({onSearch, searchTerm}) => {
    return (
       <>
            <label htmlFor="search">Rechercher une chaine: </label>
            <input name="search" type="text" onChange={onSearch}/>
            <p>{searchTerm}</p>
            <button>Rechercher</button>
        </> 
    )
    
}

export default Search