import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, serverErrorMessage, resetServerErorr }) {
  return (
    <AuthForm
      signUp={true}
      headingContent='Добро пожаловать!'
      submitContent='Зарегистрироваться'
      guessContent='Уже зарегистрированы?'
      path='/signin'
      pathContent='Войти'
      onSubmit={onRegister}
      serverErrorMessage={serverErrorMessage}
      resetServerErorr={resetServerErorr}
    />
  );
};

export default Register;
