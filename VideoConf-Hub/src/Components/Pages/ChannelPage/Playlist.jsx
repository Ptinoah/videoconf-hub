import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Playlist = ({ playlist }) => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);

    const fetchVideos = async (pageToken = null) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        try {
            const { data } = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    part: 'snippet',
                    playlistId: playlist.id,
                    maxResults: 50,
                    key: API_KEY,
                    ...(pageToken && { pageToken }),
                }
            });
            setVideos(prev => [...prev, ...data.items.map(item => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? null,
            }))]);
            setNextPageToken(data.nextPageToken ?? null);
        } catch (error) {
            console.error("Erreur fetch vidéos playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setVideos([]);
        setNextPageToken(null);
        setLoading(true);
        fetchVideos();
    }, [playlist.id]);

    return (
        <div className="video-container">
            <h2>{playlist.title}</h2>
            <p>{playlist.videoCount} vidéos</p>
            {loading ? (
                <p>Chargement des vidéos...</p>
            ) : (
                <>
                    <div className="videos-grid">
                        {videos.map(video => (
                            <div key={video.id} className="video-card" onClick={() => navigate(`/video/${video.id}`)}>
                                {video.thumbnail && <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />}
                                <div className="video-info">
                                    <h4>{video.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    {nextPageToken && (
                        <button className="load-more-button" onClick={() => fetchVideos(nextPageToken)}>
                            Charger plus
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Playlist;