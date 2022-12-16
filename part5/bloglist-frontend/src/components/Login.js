import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (e) {
      setNotification({
        type: "error",
        message: "Wrong username or password!",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log("Error: ", e);
    }
  };

  return (
    <>
      <h2>Please log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id="login_username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password:
          <input
            id="login_password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button id="login_btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Login;
