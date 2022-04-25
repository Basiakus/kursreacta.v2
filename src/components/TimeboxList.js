//import packages
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
//import components
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import Error from './Error';

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
                <Error message="błąd w Timeboxlist">
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
                </Error>
            </>
        )
    }
}

export default TimeboxList;