import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signOut,
  updatePassword,
  updateProfile,
} from '../../../Redux/modules/userSlice';
import { AppStateType } from '../../../Redux/store';
import ChangeNameForm from '../../Forms/ChangeNameForm/ChangeNameForm';
import ChangePasswordForm from '../../Forms/ChangePasswordForm/ChangePasswordForm';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const user = useSelector((state: AppStateType) => state.user);
  const dispatch = useDispatch();

  const ChangeNameFormHandleSubmit = async (displayName: string) => {
    await dispatch(updateProfile(displayName));
  };
  const ChangePasswordFormHandleSubmit = async (
    oldPassword: string,
    newPassword: string
  ) => {
    const response = await dispatch(updatePassword(oldPassword, newPassword));
    return response;
  };
  const signoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ChangeNameForm
          displayName={user.userData.displayName}
          handleSubmit={ChangeNameFormHandleSubmit}
        />
        <ChangePasswordForm handleSubmit={ChangePasswordFormHandleSubmit} />
        <button className={'btn btn-secondary  my-5'} onClick={signoutHandler}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;