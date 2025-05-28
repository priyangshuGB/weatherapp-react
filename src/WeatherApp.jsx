import React, { useState } from "react";
import Input from "./components/Input";
import { CardContent, Cards } from './components/Cards'
import { Sun, CloudRain, Snowflake } from "lucide-react";
import Button from "./components/Button";

const API_KEY = "c2add23361cfd5e30681d58a25933f86";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
    setLoading(false);
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun className="text-yellow-400 w-10 h-10" />;
      case "Rain":
        return <CloudRain className="text-blue-400 w-10 h-10" />;
      case "Snow":
        return <Snowflake className="text-gray-400 w-10 h-10" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <Cards className="w-full max-w-md p-6 shadow-2xl rounded-2xl">
        <CardContent>
          <h1 className="text-3xl font-bold mb-4 p-6 shadow-2xl rounded-2xl">
            Weather App
          </h1>
          <div className="flex gap-2 mb-4">
            <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City' className="flex-1"/>
            
            <Button onClick={fetchWeather} disabled={loading}>
                {
                    loading ? 'Loading...' : 'Search'
                }
            </Button>
            {
                weather && (
                    <div className="text-center mt-6">
                        {
                            getWeatherIcon(weather.weather[0].main)                        
                        }
                        <h2 className="text-2xl font-semibold mt-6">{weather.name}, {weather.sys.country}</h2>
                        <p className="text-lg text-gray-700">
                            {weather.weather[0].main},
                            {weather.weather[0].description},
                        </p>
                        <p className="text-4xl font-bold text-blue-400"> 
                            {Math.round(weather.main.temp)}°C
                        </p>
                    </div>
                )
            }
          </div>
        </CardContent>
      </Cards>
    </div>
  );
};

export default WeatherApp;
