import React, { useRef } from "react";
import styles from "./Auth.module.scss";
import logo from "../../../img/logo.png";
import { validatePassword } from "../../../requests/validatePassword";

export const Auth = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      await validatePassword(
        usernameInputRef.current?.value,
        passwordInputRef.current?.value
      )
    ) {
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          username: usernameInputRef.current?.value,
          password: passwordInputRef.current?.value,
        })
      );
      window.location.reload();
      return true;
    }
    return false;
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <img src={logo} alt="logo" className={styles.authLogo} />
        <form onSubmit={(e) => handleLogin(e)}>
          <span className={styles.authFieldName}>Почта:</span>
          <input
            type="text"
            className={styles.authFormField}
            placeholder="Email"
            ref={usernameInputRef}
          />
          <span className={styles.authFieldName}>Пароль:</span>
          <input
            type="text"
            className={styles.authFormField}
            placeholder="Пароль"
            ref={passwordInputRef}
          />
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
