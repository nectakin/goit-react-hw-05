import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviews } from '../../api/tmdb-api';

import Loader from '../Loader';

import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    const controller = new AbortController();

    async function getReviews() {
      try {
        const data = await fetchReviews(movieId, controller.signal);

        setReviews(data.results);
        setStatus(data.results.length > 0 ? 'success' : 'rejected');
      } catch (error) {
        throw new Error(error.message);
      }
    }
    getReviews();
    return () => controller.abort();
  }, [movieId]);

  if (status === 'pending') return <Loader />;

  if (status === 'rejected') return <p>We do not have any reviews for this movie</p>;

  return (
    <ul className={styles.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p className={styles.author}>Author: {author}</p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};
export default Reviews;