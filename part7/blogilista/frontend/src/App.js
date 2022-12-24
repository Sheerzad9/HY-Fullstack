import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./components/Home/Home";
import Notification from "./components/Notification";
import Blogs from "./components/Blog/Blogs";
import Login from "./components/Login";
import { Link, Routes, Route } from "react-router-dom";
import { initializeUser, setUser } from "./reducers/userReducer";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import SingleBlogView from "./components/Blog/SingleBlogView";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const user = useSelector(({ user }) => user);

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.clear();
    dispatch(setUser(null));
  };

  if (!user) {
    return (
      <>
        <Notification></Notification>
        <Login></Login>
      </>
    );
  }

  return (
    <div className="container">
      <div className="col-md-12">
        <div style={{ width: "100%" }}>
          <button
            onClick={handleLogout}
            style={{ color: "red", right: 0, position: "fixed" }}
          >
            Log out
          </button>
        </div>
        <Notification></Notification>

        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              User
            </Link>
          </li>
        </ul>
        <h2 className="loggedInUser">{user.name} is logged in</h2>
        <Routes>
          <Route path="/" element={<Home user={user} />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blogs/:id" element={<SingleBlogView />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<User />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
