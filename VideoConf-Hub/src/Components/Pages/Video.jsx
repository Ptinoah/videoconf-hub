import { useNavigate, useParams } from "react-router-dom";
import VideoGet from "./VideoPage/VideoGet";

const Video = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="video-container">
            <button onClick={() => navigate(-1)}>Retour</button>
            <VideoGet videoId={id} />
        </div>
    );
};

export default Video;