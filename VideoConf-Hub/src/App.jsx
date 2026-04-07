import { useState} from 'react'
import './App.css'
import Home from './Components/Pages/Home';
import Search from './Components/Search';
import monLogo from './assets/logo.webp';
import YoutubeGET from './Components/YoutubeGET';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Channel from './Components/Pages/Channel';
import PlaylistGet from './Components/Pages/ChannelPage/PlaylistGet';

function App() {
  const channel_id_list = JSON.parse(import.meta.env.VITE_CHANNELS_ID);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentChannel, setCurrentChannel] = useState();
  const [channelList, setChannelList] = useState([]);

  const handleSearch = (event) => {
    setCurrentSearch(event.target.value);
  }
  const handleHomeClick = () => {
    setCurrentPage('home');
  }

  const showPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home channels={channelList} setCurrentPage={setCurrentPage} setCurrentChannel={setCurrentChannel} setLoading={setLoading}/>;
      case 'channel':
        return <Channel currentChannel={currentChannel} PlaylistGet={PlaylistGet} setLoading={setLoading}/>;
      default:
        return <h1>Error 404</h1>;
    }
  }
 
  return (
    <div className="app-container">
      <Header Search={Search} myLogo={monLogo} handleHomeClick={handleHomeClick} handleSearch={handleSearch} currentSearch={currentSearch}/>
      <main className="main-content">
        { loading ? <h1>Chargement...</h1> : showPage() }
        <YoutubeGET channels={channel_id_list} addChannel={setChannelList} setLoading={setLoading} />
      </main>
      <Footer socials={socials}/>
    </div>
  )
}

const socials = [
  {name: "instagram", link: "http://www.instagram.com/heh.be/", icon: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png"},
  {name: "Outlook", link: "hn.muzaliawendasubia@std.heh.be", icon: "https://img.icons8.com/?size=256&id=13640&format=png"}
]

export default App
