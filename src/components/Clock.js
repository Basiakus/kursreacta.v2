import React from 'react';
import propTypes from 'prop-types';

const Clock = ({className, minutes, seconds }) => {
    return (
        <h2 className={`Clock ${className}`}>
            Pozostało {minutes <=0 ? '00' : minutes }:{seconds <= 0 ? '00' : seconds}
        </h2>
    )
}

Clock.defaultProps = {
    className: ''
}

const numberOrstringType = propTypes.oneOfType([propTypes.string, propTypes.number])
Clock.propTypes = {
    className: propTypes.string.isRequired,
    minutes: propTypes.number.isRequired,
    seconds: numberOrstringType.isRequired
}

export default Clock;