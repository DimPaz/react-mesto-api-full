import { Link } from "react-router-dom";
// import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

function Register({ onReg }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onReg({
      email: values.email,
      pass: values.pass,
    });
  }

  return (
    <div className="reg">
      <h3 className="reg__title">Регистрация</h3>
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
          Зарегистрироваться
        </button>
      </form>
      <Link className="reg__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
export default Register;
