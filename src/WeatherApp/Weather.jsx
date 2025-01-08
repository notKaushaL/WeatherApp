import { useState } from 'react';

export default function Weather() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const api_key = import.meta.env.VITE_api_key;

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${searchTerm}&key=${api_key}`);
      const data = await response.json();   
      const { temp_c: temp, humidity, wind_kph: windSpeed } = data.current;
      setWeatherData({ temp, humidity, windSpeed });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  return (
    <div className="min-h-screen bg-[url('/bgimg.jpg')] bg-cover bg-bottom flex flex-col items-center justify-center p-4">
      <div className="m-10 border border-gray-300 rounded-lg p-8 bg-white bg-opacity-30">
        <h1 className="text-5xl font-bold text-yellow-400 mb-8 text-opacity-90">Weather App</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 w-auto max-w-md bg-opacity-30">
          <div className="flex mb-4">
            <form onSubmit={(e) => {e.preventDefault(); handleSearch();}} className="flex w-full">
              <input 
                type="text" 
                className="flex-grow border bg-black text-white border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-opacity-40" 
                placeholder="Enter city name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-black text-black p-2 rounded-r-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-opacity-40"
              >
                Search
              </button>
            </form>
          </div>
          {weatherData && (
            <div className="text-center bg-opacity-80">
              <p className="text-2xl font-semibold"> ⛅ Temperature: {weatherData.temp}°C</p>
              <p className="text-xl"> 💨         Wind Speed: {weatherData.windSpeed} kph</p>
              <p className="text-xl"> 🌫️  Humidity: {weatherData.humidity}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
