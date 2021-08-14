import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
  return (
    <AuthForm
      signUp={true}
      headingContent='Добро пожаловать!'
      submitContent='Зарегистрироваться'
      guessContent='Уже зарегистрированы?'
      path='/signin'
      pathContent='Войти'
      onSubmit={onRegister}
    />
  );
};

export default Register;
