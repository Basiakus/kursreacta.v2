//import packages
import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';


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
        const {isEditable} = this.state;
        const {onDelete, title, totalTimeInMinutes} = this.props;

        //classNames
        let timeboxClassName = classNames(
            'Timebox',
            {
                'NoDisplay': isEditable
            }
        );
        let timeboxOnEditClassName = classNames(
            'Timebox',
            {
                'NoDisplay': !isEditable
            }
        )
        if(totalTimeInMinutes <= 0) {
            throw new Error('czas musi być większy od 0');
        }
        return (
            <>
                <div className={timeboxClassName}>
                    <h3>{title} - {totalTimeInMinutes}min.</h3>
                    <button onClick={ ()=> {this.handleEdit(isEditable)}}>edytuj</button>
                    <button onClick={onDelete}>usuń</button>
                </div>
                <form 
                    onSubmit={this.handleUpdateSubmit} 
                    className={timeboxOnEditClassName}
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

Timebox.defaultProps = {
    className: ''
}

Timebox.propTypes = {
    className: propTypes.string.isRequired,
    onEdit: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    totalTimeInMinutes: propTypes.number.isRequired
}

export default Timebox;