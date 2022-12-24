import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAllUsers().then((users) => setUsers(users));
  }, []);

  return !users ? null : (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Use's Page!</h2>
      <button
        onClick={() => {
          console.log("users: ", users);
        }}
      >
        Click for users!{" "}
      </button>
    </div>
  );
};

export default Users;
