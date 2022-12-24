import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { initBlogs } from "../../reducers/blogReducer";
import Blog from "./Blog";
import Togglable from "../Togglable";
import CreateBlogForm from "./CreateBlogForm";

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);
  const sortedBlogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => {
      if (a.likes === b.likes) return 0;
      return a.likes > b.likes ? -1 : 1;
    });
  });

  const blogFormRef = useRef();

  const blogCreatedSuccessfully = () => {
    blogFormRef.current.changeVisibility();
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm
          onBlogCreatedSuccessfully={blogCreatedSuccessfully}
        ></CreateBlogForm>
      </Togglable>
      <div className="blogs">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
