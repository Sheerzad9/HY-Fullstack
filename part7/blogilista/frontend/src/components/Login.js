import { useDispatch } from "react-redux";
import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { loginUser } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
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

// Login.propTypes = {
//   setUser: PropTypes.func.isRequired,
//   setNotification: PropTypes.func.isRequired,
// };

export default Login;
