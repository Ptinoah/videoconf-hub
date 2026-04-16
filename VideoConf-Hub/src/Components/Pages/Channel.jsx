import { useParams } from "react-router-dom";
import { useState } from "react";
import PlaylistGet from "./ChannelPage/PlaylistGet";
import Playlist from "./ChannelPage/Playlist";

const Channel = ({ channels, setLoading }) => {
    const { id } = useParams();
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    if (!channels || channels.length === 0) { return <h2>Chargement de la chaîne...</h2>; }
    const channelData = channels.find(c => c.id === id);
    if (!channelData) return <h2>Chaîne non trouvée</h2>;
    return (
        <div className="user-channel-container">
            <h2>{channelData.name}</h2>
            <div className="playlist-container">
                <PlaylistGet channelId={id}  onPlaylistClick={setCurrentPlaylist} setLoading={setLoading || (() => {})}/>
            </div>
            {currentPlaylist && <Playlist playlist={currentPlaylist} />}
        </div>
    );
};

export default Channel;