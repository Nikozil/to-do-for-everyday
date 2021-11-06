import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScore, addTag, Score } from '../../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../../Redux/store';
import ChangeTagForm from '../../../Forms/ChangeTagForm/ChangeTagForm';
import ChangeScoreForm from '../../../Forms/ChangeScoreForm/ChangeScoreForm';

const DayScoreComponent = () => {
  const score = useSelector(
    (state: AppStateType) => state.tasks.livedDay.score
  );
  const tag = useSelector((state: AppStateType) => state.tasks.livedDay.tag);
  const dispatch = useDispatch();

  const addTagHandler = (tag: string) => {
    dispatch(addTag(tag));
  };
  const addScoreHandler = (score: Score) => {
    dispatch(addScore(score));
  };
  return (
    <div>
      <div className="mb-1">Итоги дня</div>
      <ChangeTagForm tag={tag} handleSubmit={addTagHandler} />
      <ChangeScoreForm score={score} handleSubmit={addScoreHandler} />
    </div>
  );
};

export default DayScoreComponent;
