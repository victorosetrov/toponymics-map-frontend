import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LessonList from '../components/LessonList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserLessons = () => {
  const [loadedLessons, setloadedLessons] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/lessons/user/${userId}`
        );
        setloadedLessons(responseData.lessons);
      } catch (err) {}
    };
    fetchLessons();
  }, [sendRequest, userId]);

  const lessonDeletedHandler = deletedlessonId => {
    setloadedLessons(prevLessons =>
      prevLessons.filter(lesson => lesson.id !== deletedlessonId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedLessons && (
        <LessonList items={loadedLessons} onDeleteLesson={lessonDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserLessons;
