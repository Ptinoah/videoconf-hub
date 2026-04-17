import { useState, useEffect } from "react";
import ExpandableText from "../../ExpandableText";
import axios from "axios";

const VideoGet = ({ videoId }) => {
    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            try {
                const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'snippet,contentDetails,statistics',
                        id: videoId,
                        key: API_KEY,
                    }
                });
                
                if (!data.items?.length) {
                    setError("Vidéo introuvable.");
                    return;
                }

                const v = data.items[0];
                setVideo({
                    id: v.id,
                    title: v.snippet?.title,
                    description: v.snippet?.description,
                    publishedAt: v.snippet?.publishedAt,
                    channelId: v.snippet?.channelId,
                    duration: v.contentDetails?.duration,
                    viewCount: v.statistics?.viewCount,
                    likeCount: v.statistics?.likeCount,
                });
            } catch (err) {
                console.error("Erreur fetch video:", err);
                setError("Erreur lors du chargement de la vidéo.");
            }
        };
        fetchVideo();
    }, [videoId]);

    if (error) return <p>{error}</p>;
    if (!video) return <p>Chargement...</p>;

    return (
        <div className="video-container">
            <div className="video-player">
                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allowFullScreen
                />
                <h3>{video.title}</h3>
                <p>{video.viewCount} vues · {video.likeCount} likes</p>
                <ExpandableText text={video.description} limit={150}/>
            </div>
        </div>
    );
};

export default VideoGet;