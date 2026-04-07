import { useState } from "react";
import PlaylistGet from "./ChannelPage/PlaylistGet";
import Video from "./ChannelPage/Video";

const Channel = ({ currentChannel, setLoading }) => {
    return (
        <div className="user-channel-container">
            <div className="playlist-container">
                <PlaylistGet channelId={currentChannel.id} setLoading={setLoading} />
            </div>
            <div className="video-container">
                <Video />
            </div>
        </div>
    );
};

export default Channel