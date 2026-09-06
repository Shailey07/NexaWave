import axios from 'axios';
import { env } from '../config/env';

export const weatherService = {
  async getAdvisory(lat: number, lon: number) {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat, lon, appid: env.WEATHER_API_KEY, units: 'metric' },
    });

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      advisory: this.buildAdvisory(data.weather[0].main, data.main.temp),
    };
  },

  buildAdvisory(condition: string, temp: number) {
    if (condition === 'Rain') return 'Rain expected. Delay pesticide spraying.';
    if (temp > 38) return 'High heat. Ensure adequate irrigation.';
    return 'Weather conditions are favorable for field work.';
  },
};
