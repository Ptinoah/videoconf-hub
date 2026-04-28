import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../Context/WatchLaterContext';
import WatchLaterButton from '../Context/WatchLaterButton';

const Watchlist = () => {
    const navigate = useNavigate();
    const { watchLaterList, forceSync } = useWatchLater(); 
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>Ma Liste "À regarder plus tard"</h1>
                <button 
                    onClick={forceSync} 
                    style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Forcer la synchro
                </button>
            </div>
            
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
                                    <td>{video.channelTitle || "Inconnu"}</td>
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