import PropTypes from 'prop-types';

import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ list, route = '' }) => {
  const location = useLocation();

  return (
    <ul className={styles.moviesList}>
      {list.map(({ id, original_title }) => (
        <li key={id}>
          <Link to={`${route}${id}`} state={location}>
            {original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;

MovieList.propTypes = {
  list: PropTypes.array,
  route: PropTypes.string,
};