import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogForm from "./components/CreateBlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    if (user) blogService.setToken(user.token);
  }, [user, notification]);

  useEffect(() => {
    const existingUser = window.localStorage.getItem("loggedInUser");
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.clear();
    setUser(null);
  };

  if (!user) {
    return (
      <>
        <Notification notification={notification}></Notification>
        <Login setUser={setUser} setNotification={setNotification}></Login>
      </>
    );
  }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <button
          onClick={handleLogout}
          style={{ color: "red", right: 0, position: "fixed" }}
        >
          Log out
        </button>
      </div>
      <Notification notification={notification}></Notification>
      <div>
        <h2 style={{ color: "green" }}>{user.name} is logged in</h2>
        <h2>blogs</h2>
        <CreateBlogForm setNotification={setNotification}></CreateBlogForm>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
