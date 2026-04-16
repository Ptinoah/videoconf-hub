import { useState } from 'react';

const ExpandableText = ({ text, limit = 100 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if (!text || text.length <= limit) {
        return <p>{text}</p>;
    }
    const displayText = isExpanded ? text : text.substring(0, limit) + "...";
    return (
        <p>
            {displayText}
            <button onClick={() => setIsExpanded(!isExpanded)} className="show-more-btn">
                {isExpanded ? "Voir moins" : "Voir plus"}
            </button>
        </p>
    );
};

export default ExpandableText;