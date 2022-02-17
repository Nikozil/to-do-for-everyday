import React, { ReactNode } from 'react';
import cn from 'classnames';
import {
  ImCheckboxUnchecked,
  ImCross,
  ImCheckboxChecked,
  ImEqualizer2,
} from 'react-icons/im';
import { RiArrowGoForwardFill, RiInboxArchiveFill } from 'react-icons/ri';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import styles from './Buttons.module.scss';

export const DeleteButton: React.FC<CurrentButtonPropType> = ({
  label,
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'delete-button'}
      label={label}
      icon={<ImCross />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const ArchiveButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  label,
  clickHandler,
}) => {
  return (
    <Button
      label={label}
      name={'archive-button'}
      icon={<RiInboxArchiveFill size={'1.3em'} />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

// export const RepeatButton: React.FC<RepeatPropsType> = ({
//   task,
//   className = '',
//   clickHandler,
// }) => {
//   const { id, data } = task;
//   const { repeat } = data;

//   const clickRepeatHandler = (event: React.MouseEvent) => {
//     event.preventDefault();
//     clickHandler(id, { repeat: repeat ? 0 : 1 });
//   };

//   return (
//     <button
//       aria-label={'repeat task'}
//       name={'repeat task'}
//       onClick={clickRepeatHandler}
//       className={cn(styles.button, className)}
//       data-testid="repeat-button">
//       {repeat ? <RiPushpinFill /> : <RiPushpinLine />}
//     </button>
//   );
// };

export const CheckButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'check-button'}
      icon={<ImCheckboxUnchecked />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const UncheckButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'uncheck-button'}
      icon={<ImCheckboxChecked />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const DoItAgainButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'again-button'}
      icon={<RiArrowGoForwardFill />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const DoItAgain: React.FC<DoItAgainPropsType> = ({
  children,
  clickHandler,
}) => {
  const clickAgainHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler();
  };

  return (
    <span
      aria-label={'again task'}
      onClick={clickAgainHandler}
      className={styles['again-button']}
      data-testid="again task">
      {children}
    </span>
  );
};

export const OptionsButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'options'}
      icon={<ImEqualizer2 />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const NextButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'next'}
      icon={<MdNavigateNext />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const PrevButton: React.FC<CurrentButtonPropType> = ({
  className = '',
  clickHandler,
}) => {
  return (
    <Button
      name={'prev'}
      icon={<MdNavigateBefore />}
      className={className}
      clickHandler={clickHandler}
    />
  );
};

export const Button: React.FC<ButtonPropType> = ({
  icon,
  name,
  label,
  className = '',
  clickHandler,
}) => {
  const clickPrevHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler();
  };

  return (
    <button
      aria-label={name}
      name={name}
      onClick={clickPrevHandler}
      className={cn(styles.button, className)}
      data-testid={name}>
      {icon} {label && <label className={styles.button__label}>{label}</label>}
    </button>
  );
};

interface ButtonPropType {
  icon: JSX.Element;
  name: string;
  label?: string;
  className?: string;
  clickHandler: () => void;
}

interface CurrentButtonPropType {
  label?: string;
  className?: string;
  clickHandler: () => void;
}
interface DoItAgainPropsType {
  children: ReactNode;
  clickHandler: () => void;
}
