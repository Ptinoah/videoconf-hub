import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../Context/WatchLaterContext';
import WatchLaterButton from '../Context/WatchLaterButton';

const Watchlist = () => {
    const navigate = useNavigate();
    const { watchLaterList } = useWatchLater();
    const videos = Object.values(watchLaterList);
    const formatDate = (dateString) => {
        if (!dateString) return "Non disponible";
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="video-container">
            <h1>Ma Liste "À regarder plus tard"</h1>
            
            {videos.length === 0 ? (
                <p>Votre liste est vide.</p>
            ) : (
                <div className="table-responsive">
                    <table className="watchlist-table">
                        <thead>
                            <tr>
                                <th>Miniature</th>
                                <th>Titre de la vidéo</th>
                                <th>Auteur</th>
                                <th>Date de publication</th>
                                <th>Supprimer vidéo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.map((video) => (
                                <tr key={video.id}>
                                    <td onClick={() => navigate(`/video/${video.id}`)} style={{ cursor: 'pointer' }}>
                                        {video.thumbnail && (
                                            <img 
                                                src={video.thumbnail} 
                                                alt={video.title} 
                                                style={{ width: '120px', borderRadius: '8px' }} 
                                            />
                                        )}
                                    </td>
                                    <td 
                                        className="video-title-cell"
                                        onClick={() => navigate(`/video/${video.id}`)}
                                        style={{ cursor: 'pointer', fontWeight: '600' }}
                                    >
                                        {video.title}
                                    </td>
                                    <td>{video.channelTitle || "Inconnue"}</td>
                                    <td>{formatDate(video.publishedAt)}</td>
                                    <td>
                                        <div className="action-cell">
                                            <WatchLaterButton video={video} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Watchlist;