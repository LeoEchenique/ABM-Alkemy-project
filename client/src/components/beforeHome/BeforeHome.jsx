import React from "react";
import style from "./beforeHome.module.css";
import { useState } from "react";
import axios from "axios";

export default function BeforeHome() {
  const [log, setLog] = useState(false);
  // sign in button activates a local state to true, then the render of the fign form changes.
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const handleClick = () => {
    setLog(!log);
    setForm({
      Name: "",
      Email: "",
      Password: "",
    });
  };
  const handleChange = (e) => {
    setForm((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const createUser = async (e) => {
    // if register
    e.preventDefault();

    // pass the post to a validator function to see if all is ok

    // si tiene token: se guarda en la localStorage y se hace el pase a home.
    try {
      let res = await axios.post("http://localhost:3001/auth/createUser", form);
      if (res.data.Token) {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.replace("http://localhost:3000/Home");
      }
    } catch (error) {
      alert(error.response.data);
      setLog(false);
    }
  };

  const handleLog = async (e) => {
    // if log in..
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3001/auth/logUser", form);
      if (res.data.logged === true) {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.replace("http://localhost:3000/Home");
      }
    } catch (error) {
      alert(error.response.data);
      setLog(true);
    }
  };

  return (
    <div className={style.div_container}>
      {log === false ? (
        <div>
          <h2>Hi there!</h2>
          <div className={style.sign}>
            <h2>Time for some managment? </h2>
            <form
              onChange={(e) => handleChange(e)}
              onSubmit={handleLog}
              className={style.form}
            >
              <label className={style.label} htmlFor="email">
                {" "}
                Email:{" "}
              </label>
              <input type="text" id="email" name="Email" />

              <label className={style.label} htmlFor="pass">
                {" "}
                Password:{" "}
              </label>
              <input type="password" id="pass" name="Password" />
              <input type="submit" value="Log in!" />
            </form>
            <span>Or..</span>
            <h3 onClick={handleClick}> Sign in</h3>
          </div>
        </div>
      ) : (
        <div>
          <h2>Hi there!</h2>
          <div className={style.sign}>
            <h2>An easy step for you to get started.. </h2>
            <form
              onChange={(e) => handleChange(e)}
              onSubmit={createUser}
              className={style.form}
            >
              <label className={style.label} htmlFor="email">
                {" "}
                Email:{" "}
              </label>
              <input type="text" id="email" name="Email" />
              <label className={style.label} htmlFor="email">
                {" "}
                Name:{" "}
              </label>
              <input type="text" id="name" name="Name" />
              <label className={style.label} htmlFor="pass">
                {" "}
                Password:{" "}
              </label>
              <input type="password" id="pass" name="Password" />
              <input type="submit" value="Register now!" />
            </form>
            <span>Or..</span>
            <h3 onClick={handleClick}> Log in </h3>
          </div>
        </div>
      )}
    </div>
  );
}
