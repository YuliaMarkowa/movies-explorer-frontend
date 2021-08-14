import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, serverErrorMessage }) {
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
    />
  );
};

export default Register;
