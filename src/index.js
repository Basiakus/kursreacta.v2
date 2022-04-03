import React from 'react';
import { createRoot } from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';


const Clock = ({className="", minutes=12, seconds=46 }) => {
    return <h2 className={`Clock ${className}`}>Pozostało {minutes}:{seconds}</h2>
}
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
            <ProgressBar className={!isRunning ? 'inactive' : ''} percent={progressInPercent}/>
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
class TimeboxCreator extends React.Component {

    state = {
        title: '',
        totalTimeInMinutes: ''
    }
    handleTitleChange = event => {
        this.setState({
            title: event.target.value 
        })
    }
    handleTotalTimeInMinutesChange = event => {
        this.setState({
            totalTimeInMinutes: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate(
            {
                id: uuidv4(), 
                title: this.state.title, 
                totalTimeInMinutes: this.state.totalTimeInMinutes
            }
        )
        this.setState({
            title: '',
            totalTimeInMinutes:''
        })
    }
    render() {
        return (
            <form 
                onSubmit={this.handleSubmit} 
                className={'TimeboxCreator'}
            >
                <label>
                    Co robisz ? 
                    <input 
                        type="text"
                        onChange={this.handleTitleChange}
                        value={this.state.title}
                    />
                </label>
                <br/>
                <label>
                    Ile minut ? 
                    <input 
                        type="number" 
                        onChange={this.handleTotalTimeInMinutesChange}
                        value={this.totalTimeInMinutes}
                    />
                </label>
                <br/>
                <button>
                    Dodaj Timebox
                </button>
            </form>
        );
    }
}
class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            {id: uuidv4(), title: "uczę sie list", totalTimeInMinutes: 10},
            {id: uuidv4(), title: "uczę sie list 2", totalTimeInMinutes: 15},
            {id: uuidv4(), title: "uczę sie list 3", totalTimeInMinutes: 20}
        ]
    }
    addTimebox = (timebox) => {
        this.setState(
            prevState => {
                const timeboxes = [timebox, ...prevState.timeboxes];
                return {timeboxes}
            }
        )
    }
    removeTimebox = (idToRemove) => {
        this.setState(
            prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox, index) => timebox.id !== idToRemove)
                return {timeboxes}
            }
        )
    }
    updatedTimebox = (idToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map(timebox => 
                timebox.id === idToUpdate ? updatedTimebox : timebox
            )
            return {timeboxes}
        })
    }
    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox)
    }
    render() {
        return (
            <>
                <TimeboxCreator 
                    onCreate={this.handleCreate}
                />
                {this.state.timeboxes.map( timebox =>(
                    <Timebox 
                        key={timebox.id} 
                        timeboxId={timebox.id}
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(timebox.id)}
                        onEdit={this.updatedTimebox}
                    />
                ))}
            </>
        )
    }
}
class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            isEditable: false
        }
        const {timeboxId} = this.props;
        this.titleRef = React.createRef();
        this.totalTimeRef = React.createRef();
        this.handleUpdateSubmit = event => {
            event.preventDefault();
        }
        this.handleEdit = (isEdit) => {
            this.setState(
                {isEditable: !isEdit}
            )
            
        }
        this.handleConfirm = () => {
            this.props.onEdit(timeboxId, {id: timeboxId, title: this.titleRef.current.value, totalTimeInMinutes: this.totalTimeRef.current.value});
            this.handleEdit(this.state.isEditable);
        }
    }
    render() {
        const {onDelete, title, totalTimeInMinutes} = this.props;
        const {isEditable} = this.state;
        return (
            <>
                <div className={`Timebox ${isEditable ? 'NoDisplay' : ''}`}>
                    <h3>{title} - {totalTimeInMinutes}min.</h3>
                    <button onClick={ ()=> {this.handleEdit(isEditable)}}>edytuj</button>
                    <button onClick={onDelete}>usuń</button>
                </div>
                <form 
                    onSubmit={this.handleUpdateSubmit} 
                    className={`Timebox ${!isEditable ? 'NoDisplay' : ''}`}
                >
                    <label>
                        Co robisz ? 
                        <input 
                            type="text"
                            ref={this.titleRef}
                        />
                    </label>
                    <br/>
                    <label>
                        Ile minut ? 
                        <input 
                            type="number" 
                            ref={this.totalTimeRef}
                        />
                    </label>
                    <br/>
                    <button
                        onClick={this.handleConfirm}
                    >
                        aktualizuj 
                    </button>
                    <button
                    onClick={()=> {this.handleEdit(isEditable)}}>
                        anuluj
                    </button>
                </form>
            </>
        )
    }
}
class EditableTimebox extends React.Component {
    state = {
        title: 'wpisz zadanie...',
        totalTimeInMinutes: 25,
        isRunning: false,
        isPaused: true,
        pausesCount: 0,
        elapsedTimeInSeconds: 0,
        isEditable: true
    }
    onConfirm = () => {
        this.setState({isEditable: false})
    }
    handleEdit = () => {
        this.setState({isEditable: true})
    }

    handleTitleChange = event => {
        this.setState({title: event.target.value})
    }

    handleTotalTimeInMinutesChange = event => {
        this.setState({totalTimeInMinutes: event.target.value})
    }
    startTimer = () => {
        this.intervalId = setInterval(()=> {
            this.setState(
                prevState => ({elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + .01})
            )
        }, 10);
    }
    stopTimer = () => {
        clearInterval(this.intervalId);
    }
    handleStart = event => {
        this.setState({
            isRunning: true,
            isPaused: false,
        });
        this.startTimer();
    }
    handleStop = event => {
        this.stopTimer();
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
    }
    togglePause = event => {
        this.setState(
            function(prevState) {
                const {isPaused} = prevState;
                return {
                    isPaused:!prevState.isPaused,
                    pausesCount: isPaused ? prevState.pausesCount : prevState.pausesCount + 1
                }
            }
        );
        this.state.isPaused ? this.startTimer() : this.stopTimer();
    }

    render() {
        const {
            title, 
            totalTimeInMinutes,
            isRunning, 
            isPaused, 
            pausesCount, 
            elapsedTimeInSeconds,
            isEditable
        } = this.state;
        return (
            <>
                <TimeboxEditor 
                    isRunning={isRunning}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    handleStart={this.handleStart}
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={this.onConfirm}
                />
                <CurrentTimebox 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    isRunning={isRunning}
                    isPaused={isPaused}
                    pausesCount={pausesCount}
                    elapsedTimeInSeconds={elapsedTimeInSeconds}
                    handleStart={this.handleStart}
                    handleStop={this.handleStop}
                    togglePause={this.togglePause}
                    isEditable={isEditable}
                    handleEdit={this.handleEdit}
                />
            </>
        )
    }
}
const App = () => {
    return (
        <>
            <EditableTimebox />
            <TimeboxList />
        </>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);