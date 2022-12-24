import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import userService from "../../services/user";

const User = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    userService.getOneUser(id).then((userData) => setUserData(userData));
  }, []);

  return !userData ? null : (
    <div>
      <h2> Added blogs</h2>
      <ol>
        {userData.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default User;
