//import packages
import React from 'react';

//import components
import CurrentTimebox from './CurrentTimebox';
import TimeboxEditor from './TimeboxEditor';

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
    componentDidMount() {
        console.count('componentDidMount');
    }

    componentDidUpdate() {
        console.count('componentDidUpdate');
    }

    componentWillUnmount() {
        console.count('componentWillUnmount');
        this.stopTimer();
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
        console.log('timer is running');
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
                <React.StrictMode>
                    { isEditable ?
                        (
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
                        ) : (
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
                        )
                    }
                </React.StrictMode>    
            </>
        )
    }
}

export default EditableTimebox;