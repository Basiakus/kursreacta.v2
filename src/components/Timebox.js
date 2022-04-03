//import packages
import React from 'react';

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

export default Timebox;