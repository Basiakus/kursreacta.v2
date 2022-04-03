//import packages
import React from 'react';
//import styles 
import '../styles.css';


//import components
import EditableTimebox from './EditableTimebox';
import TimeboxList from './TimeboxList';

const App = () => {
    return (
        <>
            <EditableTimebox />
            <TimeboxList />
        </>
    );
}

export default App;