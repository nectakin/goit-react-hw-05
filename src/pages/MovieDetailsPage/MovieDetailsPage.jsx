
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';

import { fetchMovie } from '../../api/tmdb-api';

import { TMDB_IMAGE_BASE_URL } from '../../utils/helpers';

import clsx from 'clsx';
import styles from './MovieDetailsPage.module.css';

const movieInfoClassName = () => clsx(styles.movieInfo, styles.wrapper);

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  const [{ poster_path, original_title, release_date, overview, genres = [] }, setMovieDetails] =
    useState({});

  const [status, setStatus] = useState('idle');

  const releaseYear = release_date?.slice(0, 4);
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');
    const controller = new AbortController();

    async function getMovie() {
      try {
        const details = await fetchMovie(movieId, controller);
        setMovieDetails(details);
        setStatus('success');
      } catch (error) {
        setStatus('rejected');
        throw new Error(error.message);
      }
    }
    getMovie();

    return () => controller.abort();
  }, [movieId]);

  return (
    <>
      <NavLink to={backLinkHref.current} className={styles.goBackLink}>
        <FaArrowLeftLong />
        Go back
      </NavLink>

      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>Not details about this movie were found :(</p>}
      {status === 'success' && (
        <>
          <div className={movieInfoClassName()}>
            <div className={styles.leftSide}>
              <img src={`${TMDB_IMAGE_BASE_URL}w300/${poster_path}`} alt={original_title} />
            </div>
            <div className={styles.rightSide}>
              <h2>
                {original_title} ({releaseYear})
              </h2>

              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              {genres.length > 0 && (
                <ul className={styles.genresList}>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.wrapper}>
            <p>Additional information</p>
            <ul className={styles.additionalInfoList}>
              <li>
                <NavLink className={styles.link} to="cast">
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <Suspense fallback={<p>Loading...</p>}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};
export default MovieDetailsPage;
