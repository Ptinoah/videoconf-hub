import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../Context/WatchLaterContext';
import WatchLaterButton from '../Context/WatchLaterButton';

const Watchlist = () => {
    const navigate = useNavigate();
    const { watchLaterList } = useWatchLater();
    const videos = Object.values(watchLaterList);

    return (
        <div className="video-container">
            <h1>Ma Liste "À regarder plus tard"</h1>
            
            {videos.length === 0 ? (
                <p>Votre liste est vide.</p>
            ) : (
                <div className="videos-grid">
                    {videos.map((video) => (
                        <div key={video.id} className="video-card">
                            <WatchLaterButton video={video} />
                            
                            <div 
                                className="video-card-content" 
                                onClick={() => navigate(`/video/${video.id}`)}
                            >
                                {video.thumbnail && (
                                    <img 
                                        src={video.thumbnail} 
                                        alt={video.title} 
                                        className="video-thumbnail" 
                                    />
                                )}
                                
                                <div className="video-info">
                                    <h4>{video.title}</h4>
                                    {video.channelTitle && <p>{video.channelTitle}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;