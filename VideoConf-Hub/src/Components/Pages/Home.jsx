const Home = ({ channels }) => {
    return (
        <div className="channels-container">
            {channels.map(channel => (
                <div className="channel-card" key={channel.id}>
                    <img src={channel.thumbnail} alt={channel.name}className="channel-thumbnail"/>
                    <div className="channel-info">
                        <h3>{channel.name}</h3>
                        <p>{channel.subscribers} abonnés - {channel.videoCount}</p>
                        <p className="channel-description">{channel.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home