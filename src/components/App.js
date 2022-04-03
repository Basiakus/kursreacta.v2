//import packages
import React from 'react';
//import styles 
import '../styles/components.scss';


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