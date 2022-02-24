import React from 'react';
import NewTaskWithAutocompleteForm from '../../Forms/NewTaskWithAutocompleteForm/NewTaskWithAutocompleteForm';
import PlansMap from './PlansMap/PlansMap';
import styles from './TomorrowListPage.module.scss';

const TomorrowListPage = () => {
  const duration = { days: 1 };

  return (
    <article className={styles['tomorrow-page']}>
      <div className={styles['tomorrow-page__content']}>
        <section className={styles['tomorrow-tasks']}>
          <div className={'my-4'}>
            <NewTaskWithAutocompleteForm duration={duration} />
          </div>

          <PlansMap />
        </section>
      </div>
    </article>
  );
};

export default TomorrowListPage;
