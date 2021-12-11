import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScore, addTag, Score } from '../../../../Redux/modules/tasksSlice';
import {
  selectScore,
  selectTag,
} from '../../../../Redux/selectors/tasksSelector';
import ChangeScoreForm from '../../../Forms/ChangeScoreForm/ChangeScoreForm';
import ChangeTagForm from '../../../Forms/ChangeTagForm/ChangeTagForm';

const DayScoreComponent = () => {
  const dispatch = useDispatch();

  const score = useSelector(selectScore);

  const tag = useSelector(selectTag);

  const addTagHandler = (tag: string) => {
    dispatch(addTag(tag));
  };

  const addScoreHandler = (score: Score) => {
    dispatch(addScore(score));
  };

  return (
    <div>
      <div>Итоги дня</div>
      <div className="my-1">
        <ChangeTagForm tag={tag} handleSubmit={addTagHandler} />
      </div>
      <div>
        <ChangeScoreForm score={score} handleSubmit={addScoreHandler} />
      </div>
    </div>
  );
};

export default DayScoreComponent;
