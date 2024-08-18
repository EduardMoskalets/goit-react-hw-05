import { getReviewsById } from '../../movies-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBack = useRef(location?.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviewsById() {
      try {
        setIsError(false);
        const data = await getReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      }
    }
    fetchReviewsById();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage />;
  }

  if (reviews === null) {
    return <Loader />;
  }