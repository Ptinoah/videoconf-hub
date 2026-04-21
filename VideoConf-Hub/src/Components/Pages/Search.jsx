import { useState } from "react";
import SearchGet from "./SearchPage/SearchGet";

const Search = ({ channels }) => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChannelId, setSelectedChannelId] = useState(channels[0]?.id ?? "");

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setSearchTerm(inputValue.trim());
        }
    };

    return (
        <div className="search-section">
            <div className="search-bar-container">
                <select
                    className="search-select"
                    value={selectedChannelId}
                    onChange={(e) => {
                        setSelectedChannelId(e.target.value);
                        setSearchTerm("");
                    }}
                >
                    {channels.map(channel => (
                        <option key={channel.id} value={channel.id}>
                            {channel.name}
                        </option>
                    ))}
                </select>
                <div className="search-input-wrapper">
                    <input
                        className="search-input"
                        placeholder="Rechercher"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                </div>
                <button className="search-button" onClick={handleSubmit}>
                    Rechercher
                </button>
            </div>
            {searchTerm && (
                <p className="search-text">Recherche de : <strong>{searchTerm}</strong></p>
            )}
            {searchTerm && (
                <SearchGet searchTerm={searchTerm} channelId={selectedChannelId} />
            )}
        </div>
    );
};

export default Search;