import { Link, Switch, Route } from "react-router-dom";

function Header({ onSignOut, userEmail }) {
  function signOut() {
    onSignOut();
  }
  return (
    <header className="header">
      <Link to="/" className="logo"></Link>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>

        <Route path="/">
          <div className="header__email">
            {userEmail || ""}
            <button onClick={signOut} className="header__link header__btn">
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
