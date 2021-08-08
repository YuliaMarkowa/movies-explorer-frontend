import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <AuthForm
      signUp={false}
      headingContent="Рады видеть!"
      submitContent="Войти"
      guessContent="Ещё не зарегистрированы?"
      path="/signup"
      pathContent="Регистрация"
    />
  );
};

export default Login;
