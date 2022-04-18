//import packages
import React from 'react';


//import components
import Clock from './Clock'; 
import ProgressBar from './ProgressBar';

const CurrentTimebox = ({
    isRunning, 
    isPaused, 
    pausesCount, 
    elapsedTimeInSeconds,
    title, 
    totalTimeInMinutes,
    handleStart,
    handleStop,
    togglePause,
    isEditable,
    handleEdit
}) => {

    const totalTimeInSeconds = totalTimeInMinutes*60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds/60);
    const secondsLeft = Math.floor(timeLeftInSeconds%60);
    const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds)*100;
    return (
        <div className={`CurrentTimebox ${isEditable ? 'inactive' : ''}`}>
        <h1>{title}</h1>
        <Clock minutes={minutesLeft} seconds={secondsLeft <= 9 ? `0${secondsLeft}` : secondsLeft} className={!isRunning ? 'inactive' : ''}/>
        <ProgressBar 
            isStoped={!isRunning}
            percent={progressInPercent}
        />
        <button onClick={handleStart} disabled={isRunning}>start</button>
        <button onClick={handleStop} disabled={!isRunning}>stop</button>
        <button onClick={togglePause} disabled={!isRunning}>{!isPaused ? 'pauzuj': 'wznów'}</button>
        <button
            onClick={handleEdit}
            disabled={isEditable}
        >
            edytuj
        </button>
            liczba przerw: {pausesCount}
        </div>
    );
}

export default CurrentTimebox;