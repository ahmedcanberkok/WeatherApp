import React, { useState, useEffect, useReducer } from 'react'
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Search, X } from 'lucide-react'
import { weatherReducer, initialState } from './reducers/weatherReducer'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;



const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
  Mist: Wind,
  Smoke: Wind,
  Haze: Wind,
  Dust: Wind,
  Fog: Wind,
  Sand: Wind,
  Ash: Wind,
  Squall: Wind,
  Tornado: Wind,
}

export default function WeatherApp() {
  const [city, setCity] = useState('')
  const [{ weatherList, isDarkMode }, dispatch] = useReducer(weatherReducer, initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Tema ve hava durumu verilerini her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    try {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
      localStorage.setItem('weatherList', JSON.stringify(weatherList))
    } catch (error) {
      console.error("LocalStorage'a verileri kaydederken bir hata oluştu:", error)
    }
  }, [isDarkMode, weatherList])

  const fetchWeather = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) {
        throw new Error('City not found')
      }
      const data = await response.json()
      
      const newWeather = {
        city: data.name,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        main: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      }

      dispatch({ type: 'ADD_WEATHER', payload: newWeather })
      setCity('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeWeather = (index) => {
    dispatch({ type: 'REMOVE_WEATHER', index })
  }

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: !isDarkMode })
  }

  const getWeatherColor = (temp) => {
    if (temp < 0) return 'bg-blue-100 text-blue-800'
    if (temp < 10) return 'bg-cyan-100 text-cyan-800'
    if (temp < 20) return 'bg-green-100 text-green-800'
    if (temp < 30) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen py-6 flex flex-col items-center justify-center transition-colors duration-300`}>
      
      {/* Tema Değiştirme Butonu */}
      <button onClick={toggleTheme} className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md mx-auto shadow-lg rounded-lg p-8 transition-colors duration-300`}>
        <h1 className="text-3xl font-bold text-center mb-8">Weather App </h1>
        
        <form onSubmit={fetchWeather} className="relative flex items-center mb-8 w-full gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
            className={`w-full px-4 py-3 border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          <button 
            type="submit"
            className="px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              '...'
            ) : (
              <Search className="w-5 h-5 text-white" />
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-6">
          {weatherList.map((weather, index) => {
            const WeatherIcon = weatherIcons[weather.main] || Cloud
            return (
              <div key={index} className={`relative rounded-lg p-4 shadow-md ${getWeatherColor(weather.temp)} transition-all duration-300 transform hover:scale-105`}>
                {/* Silme Butonu */}
                <button
                  onClick={() => removeWeather(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  aria-label="Şehri Sil"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{weather.city}</h2>
                  <WeatherIcon className="w-8 h-8" />
                </div>
                <p className="text-4xl font-bold mt-2">{weather.temp}°C</p>
                <p className="capitalize text-gray-700 mt-1">{weather.description}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind Speed: {weather.windSpeed} m/s</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
