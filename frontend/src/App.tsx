// App.tsx
import React from 'react';
import './App.css';
import Weather from './pages/weather';

const App: React.FC = () => {
    return (
        <div className="App">
            <Weather />
        </div>
    );
};

export default App;
