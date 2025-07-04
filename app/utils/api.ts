
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchData = async (path: string) => {
  const url = `${BASE_URL}${path.includes('?') ? path + '&' : path + '?'}api_key=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
};