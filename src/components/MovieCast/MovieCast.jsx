import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Loader from '../Loader';

import { fetchMovieCast } from '../../api/tmdb-api';
import { TMDB_IMAGE_BASE_URL } from '../../utils/helpers';

import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();

  const [credits, setCredits] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    const controller = new AbortController();

    async function getCast() {
      try {
        const data = await fetchMovieCast(movieId, controller);
        setCredits(data.cast);

        setStatus(data.cast.length > 0 ? 'success' : 'rejected');
      } catch (error) {
        throw new Error(error.message);
      }
    }
    getCast();

    return () => controller.abort();
  }, [movieId]);

  if (status === 'pending') return <Loader />;
  if (status === 'rejected') return <p>No information about cast was found :(</p>;

  return (
    <ul className={styles.creditsList}>
      {credits.map(({ id, profile_path, name, character }) => (
        <li key={id}>
          <div>
            <img src={`${TMDB_IMAGE_BASE_URL}w200/${profile_path}`} alt={name} />
          </div>
          <p className={styles.name}>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};
export default MovieCast;