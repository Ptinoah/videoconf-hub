import { useEffect } from 'react';
import axios from 'axios';

const YoutubeGET = ({ channels, addChannel, setLoading }) => {
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
    const fetchChannels = async () => {
        const results = [];
        for (const channel of channels) {
            try {
                const res = await axios.get(
                    `https://www.googleapis.com/youtube/v3/channels`,
                    { params: { part: 'snippet,statistics', id: channel.id, key: api_key } }
                );
                const item = res.data.items?.[0];
                if (item) {
                    results.push({
                        id: channel.id,
                        name: channel.name,
                        thumbnail: item.snippet.thumbnails.medium.url,
                        subscribers: item.statistics.subscriberCount,
                        description: item.snippet.description,
                        videoCount: item.statistics.videoCount,
                    });
                    setLoading(false);
                }
            } catch (err) {
                console.error(`Erreur pour ${channel.name}:`, err);
            }
        }
        addChannel(results);
    };

    fetchChannels();
    }, []);

    return null;
};

export default YoutubeGET;