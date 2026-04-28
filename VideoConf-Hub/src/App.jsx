import { useState } from 'react';
import './App.css';
import monLogo from './assets/logo.webp';
import YoutubeGET from './Components/YoutubeGET';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';
import Channel from './Components/Pages/Channel';
import Video from './Components/Pages/Video';
import Search from './Components/Pages/Search';
import Error from './Components/Pages/Error';
import Watchlist from './Components/Pages/Watchlist';
import Register from './Firebase/AuthPages/Register';
import Login from './Firebase/AuthPages/Login';
import WatchLaterProvider from './Components/Context/WatchLaterContext';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Firebase/AuthPages/ProtectedRoute';

function App() {
  const channel_id_list = JSON.parse(import.meta.env.VITE_CHANNELS_ID);
  const [loading, setLoading] = useState(true);
  const [channelList, setChannelList] = useState([]);

  return (
    <div className="app-container">
      <WatchLaterProvider>
        <Header myLogo={monLogo} />
        <main className="main-content">
          {loading ? (
            <h1>Chargement...</h1>
          ) : (
            <Routes>
              <Route path="/" element={<Home channels={channelList} />} />
              <Route path="/channel/:id" element={<Channel channels={channelList} />} />
              <Route path="/video/:id" element={<Video />} />
              <Route path="/search/" element={<Search channels={channel_id_list} />} />
              <Route path="/watchlist/" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
              <Route path="/settings/" element={<ProtectedRoute><h1>Settings</h1></ProtectedRoute>} />
              <Route path="/register/" element={<Register />} />
              <Route path="/login/" element={<Login />} />
              <Route path="*" element={<Error />} />
            </Routes>
          )}
          <YoutubeGET channels={channel_id_list} addChannel={setChannelList} setLoading={setLoading} />
        </main>
        
        <Footer socials={socials} />
      </WatchLaterProvider>
    </div>
  );
}

const socials = [
  {name: "instagram", link: "http://www.instagram.com/heh.be/", icon: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png"},
  {name: "Outlook", link: "mailto:hn.muzaliawendasubia@std.heh.be", icon: "https://img.icons8.com/?size=256&id=13640&format=png"}
]

export default App;