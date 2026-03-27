const Channel = ({ currentChannel, PlaylistGet }) => {
    return (
        <div className="user-channel-container">
            <div className="playlist-container">
                <PlaylistGet channelId={currentChannel.id}/>
            </div>
        </div>
    );
};

export default Channel