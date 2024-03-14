import axios from "axios";

const API_KEY = process.env.REACT_APP_THE_MOVIE_DB_KEY;
axios.interceptors.request.use(
  (config) => ({
    ...config,
  }),
  (err) => Promise.reject(err)
);

export default axios;

export const API = {
    movies : (endpoint)=> `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`,
};