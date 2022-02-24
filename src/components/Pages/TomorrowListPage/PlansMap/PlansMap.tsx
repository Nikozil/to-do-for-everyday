import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CurrentOptions } from '../../../../common_components/TaskMapComponent/TaskMapComponent';
import { selectEndOfDay } from '../../../../Redux/selectors/clockSelector';
import { getPlans } from '../../../../utils/PlansFunctions/PlansFunction';
import PlanComponent from '../PlanComponent/PlanComponent';
import styles from './PlansMap.module.scss';

const PlansMap = () => {
  const [currentOptions, setCurrentOptions] = useState<CurrentOptions>(null);

  const time = useSelector(selectEndOfDay);

  const plans = getPlans(time);

  return (
    <section className={styles['plans-map']}>
      {plans.map((plan) => (
        <PlanComponent
          key={uuidv4()}
          date={plan.date}
          title={plan.title}
          selector={plan.selector}
          currentOptions={currentOptions}
          setCurrentOptions={setCurrentOptions}
        />
      ))}
    </section>
  );
};

export default PlansMap;
