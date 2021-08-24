import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin, serverErrorMessage, resetServerErorr, isLoading }) {
  return (
    <AuthForm
      signUp={false}
      headingContent='Рады видеть!'
      submitContent='Войти'
      guessContent='Ещё не зарегистрированы?'
      path='/signup'
      pathContent='Регистрация'
      disabled={isLoading}
      onSubmit={onLogin}
      serverErrorMessage={serverErrorMessage}
      resetServerErorr={resetServerErorr}
    />
  );
};

export default Login;
