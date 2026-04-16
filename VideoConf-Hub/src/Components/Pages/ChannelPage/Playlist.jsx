import { useState, useEffect } from "react";
import axios from "axios";

const Playlist = ({ playlist }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            try {
                const { data } = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                    params: {
                        part: 'snippet',
                        playlistId: playlist.id,
                        maxResults: 50,
                        key: API_KEY,
                    }
                });
                setVideos(data.items.map(item => ({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? null,
                })));
            } catch (error) {
                console.error("Erreur fetch vidéos playlist:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [playlist.id]);

    return (
        <div className="video-container">
            <h2>{playlist.title}</h2>
            <p>{playlist.videoCount} vidéos</p>
            {loading ? (
                <p>Chargement des vidéos...</p>
            ) : (
                <div className="videos-grid">
                    {videos.map(video => (
                        <div key={video.id} className="video-card">
                            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                                {video.thumbnail && <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />}
                                <div className="video-info">
                                    <h4>{video.title}</h4>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Playlist;