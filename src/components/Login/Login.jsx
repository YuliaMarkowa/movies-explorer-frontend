import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin, serverErrorMessage, resetServerErorr }) {
  return (
    <AuthForm
      signUp={false}
      headingContent='Рады видеть!'
      submitContent='Войти'
      guessContent='Ещё не зарегистрированы?'
      path='/signup'
      pathContent='Регистрация'
      onSubmit={onLogin}
      serverErrorMessage={serverErrorMessage}
      resetServerErorr={resetServerErorr}
    />
  );
};

export default Login;
