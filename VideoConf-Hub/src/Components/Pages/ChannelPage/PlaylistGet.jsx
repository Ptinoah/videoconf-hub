import { useState, useEffect } from "react";
import axios from "axios";

const PlaylistGet = ({ channelId, setLoading }) => {
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
                    description: playlist.snippet.description,
                    thumbnail: playlist.snippet.thumbnails.medium.url,
                    videoCount: playlist.contentDetails.itemCount,
                    publishedAt: playlist.snippet.publishedAt,
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
        <div className="playlists-grid">
            {playlists.map(playlist => (
                <div key={playlist.id} className="playlist-card">
                    <div className="playlist-thumbnail-container">
                        <img src={playlist.thumbnail} alt={playlist.title} className="playlist-thumbnail" />
                        <div className="playlist-overlay">
                            <span>{playlist.videoCount} vidéos</span>
                        </div>
                    </div>
                    <div className="playlist-info">
                        <h3>{playlist.title}</h3>
                        <p>{playlist.videoCount} vidéos</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlaylistGet