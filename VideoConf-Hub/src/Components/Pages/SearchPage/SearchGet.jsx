import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WatchLaterButton from "../../Context/WatchLaterButton";

const SearchGet = ({ searchTerm, channelId }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            setError(null);
            const API_KEY = import.meta.env.VITE_API_KEY;
            try {
                const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: searchTerm,
                        channelId,
                        type: 'video',
                        maxResults: 25,
                        key: API_KEY,
                    }
                });

                if (!data.items?.length) {
                    setError("Aucun résultat trouvé.");
                    return;
                }

                setResults(data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails?.medium?.url ?? null,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: item.snippet.publishedAt,
                })));
            } catch (err) {
                console.error("Erreur fetch search:", err);
                setError("Erreur lors de la recherche.");
            } finally {
                setLoading(false);
            }
        };
        fetchSearch();
    }, [searchTerm, channelId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="videos-grid">
            {results.map(video => (
                <div key={video.id} className="video-card" onClick={() => navigate(`/video/${video.id}`)}>
                    <WatchLaterButton video={video} />
                    
                    {video.thumbnail && (
                        <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                    )}
                    <div className="video-info">
                        <h4>{video.title}</h4>
                        <p>{video.channelTitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchGet;