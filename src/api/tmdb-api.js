import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkxZTc5MjY3YTkwNGQyMTUwMDJmMzI5ODA3NWNhMSIsInN1YiI6IjY2NjQ2ZjljNzUyMDYzZWMwZWU5YWIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E4Rheem-jBS3C72oTOQpluVvrzLSFVOpixRZ4mgwV7U';

export const fetchTrendingMovies = ({ signal }) => axios.get('/trending/movie/week', { signal }).then(res => res.data);
export const fetchMoviesByName = (query, { signal }) => axios.get(`search/movie?query=${query}`, { signal }).then(res => res.data);

export const fetchMovie = (id, { signal }) => {
  return axios.get(`/movie/${id}`, { signal }).then(res => res.data);
};

export const fetchReviews = (id, { signal }) => axios.get(`/movie/${id}/reviews`, { signal }).then(res => res.data);
export const fetchMovieCast = (id, { signal }) => axios.get(`/movie/${id}/credits`, { signal }).then(res => res.data);