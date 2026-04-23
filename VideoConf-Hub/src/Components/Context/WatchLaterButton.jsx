import { useWatchLater } from "./WatchLaterContext";

const WatchLaterButton = ({ video }) => {
    const { watchLaterList, toggleWatchLater } = useWatchLater();
    const isWatchLater = !!watchLaterList[video.id];

    return (
        <button 
            className="bookmark-button" 
            onClick={(e) => {
                e.stopPropagation();
                toggleWatchLater(video);
            }}
            aria-label={isWatchLater ? "Retirer de Regarder plus tard" : "Ajouter à Regarder plus tard"}
            title={isWatchLater ? "Retirer de Regarder plus tard" : "Regarder plus tard"}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
                fill={isWatchLater ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    );
};

export default WatchLaterButton;