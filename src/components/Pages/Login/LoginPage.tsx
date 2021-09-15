import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../api/useAuth';
import useInput from '../../../hooks/useInput';
import { useRequireAuth } from '../../../hooks/useRequireAuth';

const Login = () => {
  const auth = useAuth();
  const email = useInput('');
  const password = useInput('');
  const history = useHistory();
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    await auth.signin(email, password)(event);
    history.push('/');
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <input placeholder="Email" {...email} />
        <input placeholder="Password" type="password" {...password} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Login;
