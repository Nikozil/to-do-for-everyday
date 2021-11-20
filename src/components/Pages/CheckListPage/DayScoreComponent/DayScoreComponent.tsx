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
