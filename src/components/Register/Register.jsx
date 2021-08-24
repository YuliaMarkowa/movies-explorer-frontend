import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, serverErrorMessage, resetServerErorr, isLoading }) {
  return (
    <AuthForm
      signUp={true}
      headingContent='Добро пожаловать!'
      submitContent='Зарегистрироваться'
      guessContent='Уже зарегистрированы?'
      path='/signin'
      pathContent='Войти'
      onSubmit={onRegister}
      disabled={isLoading}
      serverErrorMessage={serverErrorMessage}
      resetServerErorr={resetServerErorr}
    />
  );
};

export default Register;
