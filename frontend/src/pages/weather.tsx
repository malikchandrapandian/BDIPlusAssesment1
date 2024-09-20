// Weather.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found or error fetching data');
            setWeather(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
