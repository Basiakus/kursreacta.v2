import React from 'react';

const Clock = ({className="", minutes=12, seconds=46 }) => {
    return <h2 className={`Clock ${className}`}>Pozostało {minutes}:{seconds}</h2>
}

export default Clock;