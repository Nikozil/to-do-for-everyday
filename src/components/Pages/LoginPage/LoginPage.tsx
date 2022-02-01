import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GreetingsComponent from '../../../common_components/GreetingsComponent/GreetingsComponent';
import { signIn } from '../../../Redux/modules/userSlice';
import LoginForm from '../../Forms/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const response = await dispatch(signIn(email, password, remember));
    return response;
  };
  const handleRegistration = async () => {
    history.push('/registration');
  };
  const handleResetPassword = async () => {
    history.push('/resetpassword');
  };
  return (
    <GreetingsComponent>
      <LoginForm
        handleSubmit={handleSubmit}
        handleRegistration={handleRegistration}
        handleResetPassword={handleResetPassword}
      />
    </GreetingsComponent>
  );
};

export default LoginPage;
