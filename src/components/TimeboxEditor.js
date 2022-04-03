//import packages
import React from 'react';

const TimeboxEditor = ({isEditable, onConfirm, title, totalTimeInMinutes, onTitleChange, onTotalTimeInMinutesChange, handleStart, isRunning}) => {
    return (
        <div className={`TimeboxEditor ${isEditable ? '' : 'inactive'}`}>
            <label>
                Co robisz ? 
                <input 
                    type="text" 
                    value={title} 
                    onChange={onTitleChange}
                    disabled={!isEditable}
                />
            </label>
            <br/>
            <label>
                Ile minut ? 
                <input 
                type="number" 
                value={totalTimeInMinutes} 
                onChange={onTotalTimeInMinutesChange}
                disabled={!isEditable}
                />
            </label>
            <br/>
            {/*<button onClick={handleStart} disabled={isRunning}>zacznij</button>*/}
            <button
                disabled={!isEditable}
                onClick={onConfirm}
            >
            zatwierdź zmiany
            </button>
        </div>
    );
}

export default TimeboxEditor;