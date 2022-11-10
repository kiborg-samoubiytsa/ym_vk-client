import React, { useRef, useState } from "react";
import styles from "./Auth.module.scss";
import logo from "../../../img/logo.png";
import { validatePassword } from "../../../requests/validatePassword";

export const Auth = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formStyle, setFormStyle] = useState({});

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
    } else setFormStyle({ border: "1px solid red" });
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
            style={formStyle}
          />
          <span className={styles.authFieldName}>Пароль:</span>
          <input
            type="text"
            className={styles.authFormField}
            placeholder="Пароль"
            ref={passwordInputRef}
            style={formStyle}
          />
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
