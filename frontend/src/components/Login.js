// import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      pass: values.pass,
    });
  }

  return (
    <div className="reg">
      <h3 className="reg__title">Вход</h3>
      <form onSubmit={handleSubmit} className="reg__form">
        <input
          className="reg__field"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          className="reg__field"
          placeholder="Пароль"
          name="pass"
          type="password"
          value={values.pass || ""}
          onChange={handleChange}
        />
        <button className="reg__btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
