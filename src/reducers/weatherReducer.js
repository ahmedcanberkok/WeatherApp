// src/reducers/weatherReducer.js

// Başlangıç durumunu localStorage'dan alıyoruz
const savedWeatherList = JSON.parse(localStorage.getItem('weatherList')) || []
const savedTheme = JSON.parse(localStorage.getItem('isDarkMode')) || false

export const initialState = {
  weatherList: savedWeatherList,
  isDarkMode: savedTheme,
}

export const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEATHER':
      return { ...state, weatherList: action.payload }
    case 'ADD_WEATHER':
      return {
        ...state,
        weatherList: [action.payload, ...state.weatherList.filter(weather => weather.city !== action.payload.city)]
      }
    case 'REMOVE_WEATHER':
      return {
        ...state,
        weatherList: state.weatherList.filter((_, index) => index !== action.index)
      }
    case 'SET_THEME':
      return { ...state, isDarkMode: action.payload }
    default:
      return state
  }
}
