import { useState, useEffect } from 'react'
import './App.css'
import Search from './Components/Search';
import monLogo from './assets/logo.webp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSearch, setCurrentSearch] = useState('');
  const handleSearch = (event) => {
    setCurrentSearch(event.target.value);
  }
  const showPage = () => {
    switch (currentPage) {
      case 'home':
        return <h2>cc</h2>;
      default:
        return <h1>Error 404</h1>;
    }
  }

  return (
    <>
      <header>
        <img src={monLogo} alt="" id="logo"/>
      </header>
      <Search onSearch={handleSearch} searchTerm={currentSearch}/>
      { showPage() }
    </>
  )
}

export default App
