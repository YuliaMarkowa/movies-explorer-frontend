import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
    <AuthForm
      signUp={true}
      headingContent="Добро пожаловать!"
      submitContent="Зарегистрироваться"
      guessContent="Уже зарегистрированы?"
      path="/signin"
      pathContent="Войти"
    />
  );
}

export default Register;
