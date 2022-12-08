import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import LessonItem from './LessonItem';
import Button from '../../shared/components/FormElements/Button';
import './LessonList.css';

const LessonList = props => {
  if (props.items.length === 0) {
    return (
      <div className="lesson-list center">
        <Card>
          <h2>No lessons found. Maybe create one?</h2>
          <Button to="/lessons/new">Share Lesson</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="lesson-list">
      {props.items.map(lesson => (
        <LessonItem
          key={lesson.id}
          id={lesson.id}
          image={lesson.image}
          title={lesson.title}
          description={lesson.description}
          address={lesson.address}
          creatorId={lesson.creator}
          coordinates={lesson.location}
          onDelete={props.onDeleteLesson}
        />
      ))}
    </ul>
  );
};

export default LessonList;
