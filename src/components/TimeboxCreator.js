//import packages
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class TimeboxCreator extends React.Component {

    state = {
        title: 'target',
        totalTimeInMinutes: 3
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
            title: 'target',
            totalTimeInMinutes: 3
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
                        value={this.state.totalTimeInMinutes}
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

export default TimeboxCreator;