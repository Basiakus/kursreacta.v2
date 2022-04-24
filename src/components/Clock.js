import React from 'react';

const Clock = ({className="", minutes=.5, seconds=0 }) => {
    return (
        <h2 className={`Clock ${className}`}>
            Pozostało {minutes <=0 ? '00' : minutes }:{seconds <= 0 ? '00' : seconds}
        </h2>
    )
}

export default Clock;