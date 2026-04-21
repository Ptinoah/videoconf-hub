import { useState, useEffect } from 'react';
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
import { WatchLaterProvider } from './Components/Context/WatchLaterContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  const channel_id_list = JSON.parse(import.meta.env.VITE_CHANNELS_ID);
  const [loading, setLoading] = useState(true);
  const [channelList, setChannelList] = useState([]);

  return (
    <div className="app-container">
      <Header myLogo={monLogo} />
      
      <main className="main-content">
        <WatchLaterProvider>
          {loading ? (
            <h1>Chargement...</h1>
          ) : (
            <Routes>
              <Route path="/" element={<Home channels={channelList} />} />
              <Route path="/channel/:id" element={<Channel channels={channelList} />} />
              <Route path="/video/:id" element={<Video />} />
              <Route path="/search/" element={<Search channels={channel_id_list} />} />
              <Route path="*" element={<Error />} />
            </Routes>
          )}
          <YoutubeGET channels={channel_id_list} addChannel={setChannelList} setLoading={setLoading} />
        </WatchLaterProvider>
      </main>
      
      <Footer socials={socials} />
    </div>
  );
}

const socials = [
  {name: "instagram", link: "http://www.instagram.com/heh.be/", icon: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png"},
  {name: "Outlook", link: "mailto:hn.muzaliawendasubia@std.heh.be", icon: "https://img.icons8.com/?size=256&id=13640&format=png"}
]

export default App;