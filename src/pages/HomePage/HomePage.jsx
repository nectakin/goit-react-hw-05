import { useEffect, useState } from 'react';

import Loader from '../../components/Loader';

import { fetchTrendingMovies } from '../../api/tmdb-api';

import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    const controller = new AbortController();

    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies(controller);

        setMovies(data.results);
        setStatus(data.results.length > 0 ? 'success' : 'rejected');
      } catch (error) {
        throw new Error(error.message);
      }
    }

    getTrendingMovies();

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Trending today</h1>

      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>Error: No movies was found :(</p>}
      {status === 'success' && <MovieList list={movies} route="movies/" />}
    </>
  );
};
export default HomePage;