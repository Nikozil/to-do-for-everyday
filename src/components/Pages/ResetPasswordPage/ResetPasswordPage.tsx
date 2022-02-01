import React from 'react';
import { useDispatch } from 'react-redux';
import GreetingsComponent from '../../../common_components/GreetingsComponent/GreetingsComponent';
import { resetPassword } from '../../../Redux/modules/userSlice';
import ResetPasswordForm from '../../Forms/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleResetPassword = async (email: string) => {
    const response = await dispatch(resetPassword(email));
    return response;
  };

  return (
    <GreetingsComponent>
      <ResetPasswordForm handleSubmit={handleResetPassword} />
    </GreetingsComponent>
  );
};

export default ResetPasswordPage;
