import { useState } from 'react';
import './assets/css/index.css';

function App() {
    return (
        <div className='w-full h-[100vh] flex justify-center items-center bg-slate-500'>
            <Box />
        </div>
    );
}

function Box() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const apiKey = 'b6cf12767e70458188f13746241409';

    const getWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            setWeather(null);
            return;
        }

        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                setWeather(data);
                setError('');
            } else {
                setError(data.error.message);
                setWeather(null);
            }
        } catch (error) {
            console.error('Error fetching the weather data:', error);
            setError('Failed to fetch weather data. Please try again later.');
            setWeather(null);
        }
    };

    return (
        <div className='w-[30%] flex flex-wrap p-5 justify-center items-center rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg text-black'>
            <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder='Enter your location'
                className='w-full h-[50px] rounded-lg border border-gray-300 bg-transparent placeholder-gray-300 text-white p-5 text-lg mb-4'
            />
            <button
                onClick={getWeather}
                className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300'
            >
                Get Weather
            </button>
            <div id="weatherResult" className='mt-4 w-full text-center'>
                {error && <p className="text-red-500">{error}</p>}
                {weather && (
                    <figure className='flex flex-col items-center w-full'>
                        <img src={weather.current.condition.icon} alt="Weather Icon" className='w-24 h-24 object-cover mb-4' />
                        <figcaption className='w-full flex flex-col items-center'>
                            <h2 className='text-4xl font-bold'>{weather.current.temp_c}°C</h2>
                            <span className='text-2xl text-gray-300'>{weather.current.condition.text}</span>
                            <div className='flex justify-around w-full mt-4'>
                                <div className='flex flex-col items-center'>
                                    <h2 className='text-xl'>{weather.current.humidity}%</h2>
                                    <span className='text-sm text-gray-300'>Humidity</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <h2 className='text-xl'>{weather.current.wind_kph} kph</h2>
                                    <span className='text-sm text-gray-300'>Wind Speed</span>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                )}
            </div>
        </div>
    );
}

export default App;
