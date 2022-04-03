import React from 'react';

const ProgressBar = ({className="", percent}) => {
    return (
        <div className={`ProgressBar ${className}`}
            style={{
                background: `linear-gradient(
                    to left,
                    white 0% ${percent}%, 
                    orangered ${percent}% 100%
                )`
            }}
        ></div>
    )
}

export default ProgressBar;