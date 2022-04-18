import React from 'react';
import classNames from 'classnames';

const ProgressBar = ({className="", percent, isStoped}) => {
    let progressClassNames = classNames(
        'ProgressBar',
        className,
        {
            'inactive': isStoped
        }
    )
    return (
        <div className={progressClassNames}
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