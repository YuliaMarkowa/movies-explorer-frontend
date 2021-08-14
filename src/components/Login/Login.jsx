import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin }) {
  return (
    <AuthForm
      signUp={false}
      headingContent='Рады видеть!'
      submitContent='Войти'
      guessContent='Ещё не зарегистрированы?'
      path='/signup'
      pathContent='Регистрация'
      onSubmit={onLogin}
    />
  );
};

export default Login;
