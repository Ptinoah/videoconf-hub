import { useState, useEffect } from "react";
import axios from "axios";
import menuIcon from "../../../assets/icons8-menu.svg";

const PlaylistGet = ({ channelId, setLoading, onPlaylistClick }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            try {
                const { data } = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
                    params: {
                        part: 'snippet,contentDetails',
                        channelId,
                        maxResults: 50,
                        key: API_KEY,
                    }
                });
                setPlaylists(data.items.map(playlist => ({
                    id: playlist.id,
                    title: playlist.snippet.title,
                    videoCount: playlist.contentDetails.itemCount,
                })));
            } catch (error) {
                console.error("Erreur fetch playlists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylists();
    }, [channelId]);

    return (
            <div className="playlists-list-container">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="playlist-list-item" onClick={() => onPlaylistClick(playlist)}>
                        
                        <div className="playlist-item-left">
                            <img src={menuIcon} alt="Playlist" className="playlist-list-icon" />
                            <h3 className="playlist-list-title">{playlist.title}</h3>
                        </div>

                        <div className="playlist-item-right">
                            <span className="playlist-list-badge">{playlist.videoCount}</span>
                        </div>

                    </div>
                ))}
            </div>
        );
    };

export default PlaylistGet;