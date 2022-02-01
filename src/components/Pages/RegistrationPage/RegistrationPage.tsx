import React from 'react';
import { useDispatch } from 'react-redux';
import GreetingsComponent from '../../../common_components/GreetingsComponent/GreetingsComponent';
import { signUp } from '../../../Redux/modules/userSlice';
import RegistrationForm from '../../Forms/RegistrationForm/RegistrationForm';

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleRegistration = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const response = await dispatch(signUp(email, password, remember));
    return response;
  };

  return (
    <GreetingsComponent>
      <RegistrationForm handleSubmit={handleRegistration} />
    </GreetingsComponent>
  );
};

export default RegistrationPage;
